import "./App.css"
import { useState } from "react"
import Header from "./components/Header"
import TickersList from "./components/TickersList"
import StockLineChart from "./components/StockLineChart"
import { mockTickerList } from "./mocks/tickers"
import type { TickerListItem } from "./mocks/tickers"

function App() {
  const [selectedTicker, setSelectedTicker] = useState<TickerListItem>(mockTickerList[0])

  return (
    <>
      <Header />
      <StockLineChart ticker={selectedTicker} />
      <TickersList
        selectedSymbol={selectedTicker.symbol}
        onSelectTicker={setSelectedTicker}
      />
    </>
  )
}

export default App
