import "./App.css"
import MultibankLogo from "./assets/MultiBank-Logo.png"

function App() {
  return (
    <>
      <header className="flex">
        <img src={MultibankLogo} alt="Multibank Logo" height={82} width={181} />
        <h1 className="text-2xl font-bold mt-4 ml-2">
          Real Time Trading Dashboard
        </h1>
      </header>
    </>
  )
}

export default App
