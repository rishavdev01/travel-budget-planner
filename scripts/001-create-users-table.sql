CREATE TABLE IF NOT EXISTS wanderwallet_users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS wanderwallet_sessions (
  id TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES wanderwallet_users(id) ON DELETE CASCADE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON wanderwallet_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON wanderwallet_sessions(expires_at);
CREATE INDEX IF NOT EXISTS idx_users_email ON wanderwallet_users(email);
