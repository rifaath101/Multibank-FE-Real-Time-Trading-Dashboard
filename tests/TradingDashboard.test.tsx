import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import TradingDashboard from "../src/components/TradingDashboard"
import { useMarketStore } from "../src/store/marketStore"

vi.mock("../src/hooks/marketDataInitialization", () => ({
  useInitializeMarketDataFromMocks: vi.fn(),
}))

vi.mock("../src/components/StockLineChart", () => ({
  default: ({ ticker }: { ticker: { symbol: string; name: string } }) => (
    <section>
      <h2>{ticker.symbol} performance</h2>
      <p>{ticker.name}</p>
    </section>
  ),
}))

describe("TradingDashboard integration", () => {
  beforeEach(() => {
    useMarketStore.getState().resetMarketStateFromMocks()
  })

  afterEach(() => {
    cleanup()
  })

  it("renders dashboard header, chart, and tickers list", () => {
    render(<TradingDashboard />)

    expect(screen.getByText("Real Time Trading Dashboard")).toBeInTheDocument()
    expect(screen.getByText("All")).toBeInTheDocument()
    expect(screen.getByText("AAPL performance")).toBeInTheDocument()
    expect(screen.getByText("MSFT")).toBeInTheDocument()
  })

  it("updates selected ticker and chart when a different ticker is clicked", () => {
    render(<TradingDashboard />)

    fireEvent.click(screen.getByText("MSFT"))

    expect(screen.getByText("MSFT performance")).toBeInTheDocument()
    expect(useMarketStore.getState().selectedSymbol).toBe("MSFT")
  })

  it("returns nothing when there are no tickers", () => {
    useMarketStore.setState({
      tickers: [],
      selectedSymbol: "",
      initialPriceBySymbol: {},
    })

    const { container } = render(<TradingDashboard />)
    expect(container.firstChild).toBeNull()
  })
})
