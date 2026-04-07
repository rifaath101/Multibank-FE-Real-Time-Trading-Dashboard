import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react"
import Login from "../src/components/Login"

function submitCredentials(username: string, password: string) {
  fireEvent.change(screen.getByLabelText(/username/i), {
    target: { value: username },
  })
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: password },
  })
  fireEvent.click(screen.getByRole("button", { name: /log in/i }))
}

describe("Login integration", () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  afterEach(() => {
    cleanup()
    vi.useRealTimers()
  })

  it("shows an error for invalid credentials", () => {
    render(<Login onSuccess={vi.fn()} />)

    submitCredentials("wrong", "wrong")

    expect(screen.getByRole("alert")).toHaveTextContent("User not found")
  })

  it("locks the user out after three failed attempts", () => {
    render(<Login onSuccess={vi.fn()} />)

    submitCredentials("wrong", "wrong")
    submitCredentials("wrong", "wrong")
    submitCredentials("wrong", "wrong")

    expect(screen.getByRole("button")).toBeDisabled()
    expect(screen.getByRole("button")).toHaveTextContent(/wait/i)
  })

  it("keeps lockout across refresh and unlocks after 60 seconds", () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date("2026-01-01T00:00:00.000Z"))

    const onSuccess = vi.fn()
    const firstRender = render(<Login onSuccess={onSuccess} />)

    submitCredentials("wrong", "wrong")
    submitCredentials("wrong", "wrong")
    submitCredentials("wrong", "wrong")
    expect(screen.getByRole("button")).toBeDisabled()

    firstRender.unmount()
    render(<Login onSuccess={onSuccess} />)

    const lockedButton = screen.getByRole("button")
    expect(lockedButton).toBeDisabled()
    expect(lockedButton).toHaveTextContent(/wait/i)

    act(() => {
      vi.advanceTimersByTime(60_000)
    })

    expect(screen.getByRole("button")).toBeEnabled()
  })

  it("calls onSuccess with valid credentials", () => {
    const onSuccess = vi.fn()
    render(<Login onSuccess={onSuccess} />)

    submitCredentials("rifaath", "123")

    expect(onSuccess).toHaveBeenCalledTimes(1)
  })
})
