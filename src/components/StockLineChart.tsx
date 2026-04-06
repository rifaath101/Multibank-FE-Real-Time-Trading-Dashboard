import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import type { TickerListItem } from "../mocks/tickers"

type StockLineChartProps = {
  ticker: TickerListItem
}

type ChartPoint = {
  label: string
  price: number
}

const buildHalfHourLabel = (pointIndex: number): string => {
  const hour = 9 + Math.floor(pointIndex / 2)
  const minute = pointIndex % 2 === 0 ? "00" : "30"

  return `${hour}:${minute}`
}

// helper function (above your component or in a separate utils file)
const formatTooltipValue = (value: unknown): [string, string] => {
  if (typeof value !== "number") {
    return [String(value), "Price"]
  }

  return [`$${value.toFixed(2)}`, "Price"]
}

const createMockPriceAndTimeData = (ticker: TickerListItem): ChartPoint[] => {
  const currentPrice = ticker.price
  const netMove = ticker.change
  const startingPriceEstimate = currentPrice - netMove
  const totalPoints = 12
  const generatedSeries: ChartPoint[] = []

  for (let pointIndex = 0; pointIndex < totalPoints; pointIndex += 1) {
    // Moves the line gradually from estimated start price to current price.
    const progressRatio = pointIndex / (totalPoints - 1)
    const directionalMove = netMove * progressRatio

    // Adds small fluctuation so the line looks more natural.
    const fluctuationAmplitude = Math.max(Math.abs(netMove) * 0.22, 0.4)
    const fluctuation = Math.sin(pointIndex * 1.35) * fluctuationAmplitude

    const simulatedPrice = Number(
      (startingPriceEstimate + directionalMove + fluctuation).toFixed(2),
    )

    generatedSeries.push({
      label: buildHalfHourLabel(pointIndex),
      price: simulatedPrice,
    })
  }

  generatedSeries[generatedSeries.length - 1] = {
    label: generatedSeries[generatedSeries.length - 1].label,
    price: Number(currentPrice.toFixed(2)),
  }

  console.log(generatedSeries, " generatedSeries")

  return generatedSeries
}

const StockLineChart = ({ ticker }: StockLineChartProps) => {
  const chartData = createMockPriceAndTimeData(ticker)
  const lineColor = ticker.change >= 0 ? "#16a34a" : "#dc2626"

  return (
    <div className="mt-8 rounded-lg border border-gray-200 p-4">
      <h2 className="text-xl font-semibold">{ticker.symbol} performance</h2>
      <p className="mt-1 text-sm text-gray-500">{ticker.name}</p>

      <div className="mt-4 h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="label" tick={{ fontSize: 12 }} />
            <YAxis
              domain={["auto", "auto"]}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `$${Number(value).toFixed(0)}`}
            />
            <Tooltip formatter={formatTooltipValue} />
            <Line
              type="monotone"
              dataKey="price"
              stroke={lineColor}
              strokeWidth={2.5}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default StockLineChart
