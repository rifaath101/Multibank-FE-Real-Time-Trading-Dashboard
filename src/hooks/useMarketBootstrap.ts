import { useEffect } from "react"
import { connectMockLivePriceFeed } from "../lib/market/mockMarketFeed"
import { useMarketStore } from "../store/marketStore"

export function useMarketBootstrap() {
  const resetMarketStateFromMocks = useMarketStore(
    (s) => s.resetMarketStateFromMocks,
  )

  useEffect(() => {
    resetMarketStateFromMocks()
    const stopMockLivePriceFeed = connectMockLivePriceFeed()
    return stopMockLivePriceFeed
  }, [resetMarketStateFromMocks])
}
