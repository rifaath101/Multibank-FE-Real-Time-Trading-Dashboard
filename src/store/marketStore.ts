import { create } from "zustand"
import { mockTickerList } from "../mocks/tickers"
import type { TickerListItem } from "../mocks/tickers"

function buildMarketStateFromMocks() {
  const tickers = mockTickerList.map((tickerRow) => ({ ...tickerRow }))

  const initialPriceBySymbol: Record<string, number> = {}
  for (const tickerRow of tickers) {
    initialPriceBySymbol[tickerRow.symbol] = tickerRow.price
  }

  return { tickers, initialPriceBySymbol }
}

const defaultMarketStateFromMocks = buildMarketStateFromMocks()

type MarketStoreState = {
  initialPriceBySymbol: Record<string, number>
  selectedSymbol: string
  tickers: TickerListItem[]
  resetMarketStateFromMocks: () => void
  setSelectedTicker: (tickerRow: TickerListItem) => void
  applyLivePriceUpdate: (symbol: string, newPrice: number) => void
}

export const useMarketStore = create<MarketStoreState>((set, get) => ({
  ...defaultMarketStateFromMocks,
  selectedSymbol: mockTickerList[0]?.symbol ?? "",

  resetMarketStateFromMocks: () => {
    const freshState = buildMarketStateFromMocks()
    const previouslySelectedSymbol = get().selectedSymbol
    const selectionStillValid = freshState.tickers.some(
      (row) => row.symbol === previouslySelectedSymbol,
    )

    set({
      ...freshState,
      selectedSymbol: selectionStillValid
        ? previouslySelectedSymbol
        : (freshState.tickers[0]?.symbol ?? ""),
    })
  },

  setSelectedTicker: (tickerRow) => {
    set({ selectedSymbol: tickerRow.symbol })
  },

  applyLivePriceUpdate: (symbol, newPrice) => {
    set((state) => ({
      tickers: state.tickers.map((tickerRow) => {
        if (tickerRow.symbol !== symbol) return tickerRow

        const initialPrice =
          state.initialPriceBySymbol[symbol] ?? tickerRow.price
        const price = Number(newPrice.toFixed(2))
        const change = Number((price - initialPrice).toFixed(2))
        const changePercent =
          initialPrice !== 0
            ? Number(((change / initialPrice) * 100).toFixed(2))
            : 0

        return { ...tickerRow, price, change, changePercent }
      }),
    }))
  },
}))
