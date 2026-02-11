import { neon } from "@neondatabase/serverless"
import { cookies } from "next/headers"

let _sql: ReturnType<typeof neon> | null = null

function sql() {
  if (!_sql) {
    const url = process.env.DATABASE_URL
    if (!url) {
      throw new Error(
        "DATABASE_URL environment variable is not set. Please configure your Neon database connection."
      )
    }
    _sql = neon(url)
  }
  return _sql
}

function generateToken(length = 48): string {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  let result = ""
  const array = new Uint8Array(length)
  crypto.getRandomValues(array)
  for (let i = 0; i < length; i++) {
    result += chars[array[i] % chars.length]
  }
  return result
}

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const salt = generateToken(16)
  const data = encoder.encode(salt + password)
  const hashBuffer = await crypto.subtle.digest("SHA-256", data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
  return `${salt}:${hashHex}`
}

async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [salt, hash] = stored.split(":")
  const encoder = new TextEncoder()
  const data = encoder.encode(salt + password)
  const hashBuffer = await crypto.subtle.digest("SHA-256", data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
  return hashHex === hash
}

export async function signUp(name: string, email: string, password: string) {
  const db = sql()

  const existing = await db`SELECT id FROM wanderwallet_users WHERE email = ${email}`
  if (existing.length > 0) {
    return { error: "An account with this email already exists" }
  }

  const hashedPassword = await hashPassword(password)

  const inserted = await db`
    INSERT INTO wanderwallet_users (name, email, password_hash)
    VALUES (${name}, ${email}, ${hashedPassword})
    RETURNING id
  `

  const userId = inserted[0].id

  const sessionToken = generateToken(48)
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)

  await db`
    INSERT INTO wanderwallet_sessions (id, user_id, expires_at)
    VALUES (${sessionToken}, ${userId}, ${expiresAt.toISOString()})
  `

  const cookieStore = await cookies()
  cookieStore.set("session_token", sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  })

  return { success: true, user: { id: userId, name, email } }
}

export async function signIn(email: string, password: string) {
  const db = sql()

  const users = await db`SELECT id, name, email, password_hash FROM wanderwallet_users WHERE email = ${email}`
  if (users.length === 0) {
    return { error: "Invalid email or password" }
  }

  const user = users[0]
  const valid = await verifyPassword(password, user.password_hash)
  if (!valid) {
    return { error: "Invalid email or password" }
  }

  const sessionToken = generateToken(48)
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)

  await db`
    INSERT INTO wanderwallet_sessions (id, user_id, expires_at)
    VALUES (${sessionToken}, ${user.id}, ${expiresAt.toISOString()})
  `

  const cookieStore = await cookies()
  cookieStore.set("session_token", sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  })

  return { success: true, user: { id: user.id, name: user.name, email: user.email } }
}

export async function getSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get("session_token")?.value
  if (!token) return null

  const db = sql()

  const sessions = await db`
    SELECT s.id, s.user_id, s.expires_at, u.name, u.email
    FROM wanderwallet_sessions s
    JOIN wanderwallet_users u ON u.id = s.user_id
    WHERE s.id = ${token} AND s.expires_at > NOW()
  `

  if (sessions.length === 0) return null

  return {
    user: {
      id: sessions[0].user_id,
      name: sessions[0].name,
      email: sessions[0].email,
    },
  }
}

export async function signOut() {
  const cookieStore = await cookies()
  const token = cookieStore.get("session_token")?.value
  if (token) {
    const db = sql()
    await db`DELETE FROM wanderwallet_sessions WHERE id = ${token}`
  }
  cookieStore.delete("session_token")
  return { success: true }
}
