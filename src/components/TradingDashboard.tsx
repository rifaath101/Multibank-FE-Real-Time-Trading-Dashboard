import Header from "./Header"
import TickersList from "./TickersList"
import StockLineChart from "./StockLineChart"
import { useInitializeMarketDataFromMocks } from "../hooks/marketDataInitialization"
import { useMarketStore } from "../store/marketStore"

function TradingDashboard() {
  useInitializeMarketDataFromMocks()

  const tickers = useMarketStore((s) => s.tickers)
  const selectedSymbol = useMarketStore((s) => s.selectedSymbol)
  const selectedTicker =
    tickers.find((t) => t.symbol === selectedSymbol) ?? tickers[0]

  if (!selectedTicker) {
    return null
  }

  return (
    <>
      <Header />
      <StockLineChart ticker={selectedTicker} />
      <TickersList />
    </>
  )
}

export default TradingDashboard
