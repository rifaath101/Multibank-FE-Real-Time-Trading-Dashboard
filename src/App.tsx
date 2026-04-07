import { useState } from "react"
import Login from "./components/Login"
import TradingDashboard from "./components/TradingDashboard"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  if (!isLoggedIn) {
    return <Login onSuccess={() => setIsLoggedIn(true)} />
  }

  return <TradingDashboard />
}

export default App
