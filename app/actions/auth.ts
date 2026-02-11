"use server"

import { signUp, signIn, signOut, getSession } from "@/lib/auth"
import { redirect } from "next/navigation"

export async function signUpAction(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirmPassword") as string

  if (!name || !email || !password || !confirmPassword) {
    return { error: "All fields are required" }
  }

  if (password.length < 6) {
    return { error: "Password must be at least 6 characters" }
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match" }
  }

  const result = await signUp(name, email, password)
  if (result.error) {
    return { error: result.error }
  }

  redirect("/")
}

export async function signInAction(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  const result = await signIn(email, password)
  if (result.error) {
    return { error: result.error }
  }

  redirect("/")
}

export async function signOutAction() {
  await signOut()
  redirect("/login")
}

export async function getSessionAction() {
  return await getSession()
}
