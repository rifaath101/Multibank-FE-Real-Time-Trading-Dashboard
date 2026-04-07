import { useEffect, useState } from "react"
import MultibankLogo from "../assets/MultiBank-Logo.png"

const VALID_USERNAME = "rifaath"
const VALID_PASSWORD = "123"
const MAX_ATTEMPTS = 3
const LOCKOUT_MS = 60_000
const FAILED_ATTEMPTS_KEY = "login.failedAttempts"
const LOCKOUT_UNTIL_KEY = "login.lockoutUntil"

function getNumberFromLocalStorage(key: string): number | null {
  if (typeof window === "undefined") return null
  const saved = window.localStorage.getItem(key)
  const parsed = Number(saved)
  return Number.isFinite(parsed) ? parsed : null
}

function getFailedAttemptsFromLocalStorage(
  key: string,
  fallbackValue: number,
): number {
  const parsed = getNumberFromLocalStorage(key)
  return parsed !== null && parsed >= 0 ? parsed : fallbackValue
}

function getLockoutValueFromLocalStorage(key: string): number | null {
  const parsed = getNumberFromLocalStorage(key)
  // Expired lockout values are cleared so refresh cannot reuse stale lockouts.
  if (parsed === null || parsed <= Date.now()) {
    if (typeof window === "undefined") return null
    window.localStorage.removeItem(key)
    return null
  }
  return parsed
}

type LoginProps = {
  onSuccess: () => void
}

function Login({ onSuccess }: LoginProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [failedAttempts, setFailedAttempts] = useState(() =>
    getFailedAttemptsFromLocalStorage(FAILED_ATTEMPTS_KEY, 0),
  )
  const [lockoutUntil, setLockoutUntil] = useState<number | null>(() =>
    getLockoutValueFromLocalStorage(LOCKOUT_UNTIL_KEY),
  )
  const [error, setError] = useState<string | null>(null)
  const [now, setNow] = useState(0)

  useEffect(() => {
    if (lockoutUntil === null) return

    const isLockoutActive = Date.now() < lockoutUntil
    if (!isLockoutActive) return

    // Re-render once per second while locked so the countdown updates.
    const intervalMs = 1000
    setTimeout(() => setNow(Date.now()), 0)
    const intervalId = setInterval(() => {
      setNow(Date.now())
    }, intervalMs)

    return () => clearInterval(intervalId)
  }, [lockoutUntil])

  useEffect(() => {
    window.localStorage.setItem(FAILED_ATTEMPTS_KEY, String(failedAttempts))
  }, [failedAttempts])

  useEffect(() => {
    if (lockoutUntil === null) {
      window.localStorage.removeItem(LOCKOUT_UNTIL_KEY)
      return
    }
    window.localStorage.setItem(LOCKOUT_UNTIL_KEY, String(lockoutUntil))
  }, [lockoutUntil])

  const isLockedOut = lockoutUntil !== null && now < lockoutUntil
  const secondsLeft =
    isLockedOut && lockoutUntil !== null
      ? Math.ceil((lockoutUntil - now) / 1000)
      : 0

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    const today = Date.now()
    let effectiveLockout = lockoutUntil
    let attempts = failedAttempts

    if (effectiveLockout !== null && today >= effectiveLockout) {
      // If lockout has already expired, reset state before validating.
      effectiveLockout = null
      attempts = 0
      setLockoutUntil(null)
      setFailedAttempts(0)
    }

    if (effectiveLockout !== null && today < effectiveLockout) {
      setError(
        `Too many attempts. Try again in ${Math.ceil((effectiveLockout - today) / 1000)} seconds.`,
      )
      return
    }

    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
      // Successful login clears lockout and failed-attempt persistence.
      setFailedAttempts(0)
      setLockoutUntil(null)
      window.localStorage.removeItem(FAILED_ATTEMPTS_KEY)
      window.localStorage.removeItem(LOCKOUT_UNTIL_KEY)
      onSuccess()
      return
    }

    const next = attempts + 1
    setFailedAttempts(next)
    setError("User not found")

    if (next >= MAX_ATTEMPTS) {
      // Third failed attempt starts a 60-second lockout window.
      const lockedUntil = Date.now() + LOCKOUT_MS
      setLockoutUntil(lockedUntil)
      setNow(Date.now())
    }
  }

  return (
    <div className="login-shell">
      <div className="login-card">
        <div className="login-card-header">
          <img
            src={MultibankLogo}
            alt="Multibank"
            width={181}
            height={82}
            className="login-logo"
          />
          <h1 className="login-title">Sign in</h1>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-field">
            <label htmlFor="login-username" className="login-label">
              Username
            </label>
            <input
              id="login-username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLockedOut}
              className="login-input"
            />
          </div>
          <div className="login-field">
            <label htmlFor="login-password" className="login-label">
              Password
            </label>
            <input
              id="login-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLockedOut}
              className="login-input"
            />
          </div>

          {error ? (
            <p className="login-error" role="alert">
              {error}
              {isLockedOut ? ` (${secondsLeft}s)` : null}
            </p>
          ) : null}

          <button type="submit" disabled={isLockedOut} className="login-submit">
            {isLockedOut ? `Wait ${secondsLeft}s` : "Log in"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
