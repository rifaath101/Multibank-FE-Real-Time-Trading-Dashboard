import { useMarketStore } from "../../store/marketStore"

const TICK_MS = 1500

/**
 * Starts mock “live” price updates on an interval.
 *
 * @returns A **function** — call it to stop updates (same idea as `socket.close()` in a real feed).
 *          That function itself returns nothing (`undefined`) after clearing the interval.
 */
export function connectMockLivePriceFeed(): () => void {
  const id = window.setInterval(() => {
    const { tickers, applyLivePriceUpdate } = useMarketStore.getState()

    for (const row of tickers) {
      const randomPriceChange = (Math.random() - 0.5) * 0.6
      const nextPrice = Math.max(0.01, row.price + randomPriceChange)
      applyLivePriceUpdate(row.symbol, nextPrice)
    }
  }, TICK_MS)

  return () => {
    window.clearInterval(id)
  }
}
