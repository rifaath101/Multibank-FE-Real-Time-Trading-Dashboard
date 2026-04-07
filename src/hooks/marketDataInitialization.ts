import { useEffect } from "react"
import { connectMockLivePriceFeed } from "../lib/mockMarketFeed"
import { useMarketStore } from "../store/marketStore"

export function useInitializeMarketDataFromMocks() {
  const resetMarketStateFromMocks = useMarketStore(
    (s) => s.resetMarketStateFromMocks,
  )

  useEffect(() => {
    resetMarketStateFromMocks()
    const stopMockLivePriceFeed = connectMockLivePriceFeed()
    return stopMockLivePriceFeed
  }, [resetMarketStateFromMocks])
}
