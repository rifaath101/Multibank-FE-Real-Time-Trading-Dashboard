import { mockTickerList } from "../mocks/tickers"
import type { TickerListItem } from "../mocks/tickers"

type TickersListProps = {
  selectedSymbol: string
  onSelectTicker: (ticker: TickerListItem) => void
}

function TickersList({ selectedSymbol, onSelectTicker }: TickersListProps) {
  const tickers = mockTickerList

  const handleTickerClick = (ticker: TickerListItem) => {
    onSelectTicker(ticker)
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold">All</h2>
      <div className="mt-4 space-y-3">
        {tickers.map((ticker) => (
          <div
            key={ticker.symbol}
            className={`ticker-row ${selectedSymbol === ticker.symbol ? "ticker-row-selected" : ""}`}
            role="button"
            tabIndex={0}
            onClick={() => handleTickerClick(ticker)}
          >
            <div className="ticker-symbol">{ticker.symbol}</div>

            <div className="ticker-fields">
              <p className="ticker-name">{ticker.name}</p>
              <p className="ticker-value">${ticker.price.toFixed(2)}</p>
              <p
                className={`ticker-pill ${
                  ticker.change > 0
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {ticker.change > 0
                  ? `+${ticker.change.toFixed(2)}`
                  : ticker.change.toFixed(2)}
              </p>
              <p
                className={`ticker-pill ${
                  ticker.changePercent > 0
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {ticker.changePercent > 0
                  ? `+${ticker.changePercent.toFixed(2)}%`
                  : `${ticker.changePercent.toFixed(2)}%`}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TickersList
