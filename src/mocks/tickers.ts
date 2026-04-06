export type TickerListItem = {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
}

export const mockTickerList: TickerListItem[] = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 214.36,
    change: 1.42,
    changePercent: 0.67,
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corp.",
    price: 428.91,
    change: -2.18,
    changePercent: -0.51,
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corp.",
    price: 121.54,
    change: 3.72,
    changePercent: 3.16,
  },
  {
    symbol: "TSLA",
    name: "Tesla Inc.",
    price: 176.83,
    change: -1.96,
    changePercent: -1.1,
  },
  {
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    price: 191.28,
    change: 0.88,
    changePercent: 0.46,
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: 167.04,
    change: -0.43,
    changePercent: -0.26,
  },
]
