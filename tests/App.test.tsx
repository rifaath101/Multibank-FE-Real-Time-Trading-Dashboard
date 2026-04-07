import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import App from "../src/App"

vi.mock("../src/components/TradingDashboard", () => ({
  default: () => <div>Dashboard Loaded</div>,
}))

describe("App integration", () => {
  it("shows dashboard after successful login", () => {
    render(<App />)

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "rifaath" },
    })
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "123" },
    })
    fireEvent.click(screen.getByRole("button", { name: /log in/i }))

    expect(screen.getByText("Dashboard Loaded")).toBeInTheDocument()
  })
})
