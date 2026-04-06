import "./App.css"
import Header from "./components/Header"
import TickersList from "./components/TickersList"
import StockLineChart from "./components/StockLineChart"
import { useMarketBootstrap } from "./hooks/useMarketBootstrap"
import { useMarketStore } from "./store/marketStore"

function App() {
  useMarketBootstrap()

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

export default App
