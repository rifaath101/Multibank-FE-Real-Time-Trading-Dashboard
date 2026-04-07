import { useMarketStore } from "../store/marketStore"

const TICK_MS = 1500

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
