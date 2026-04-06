import MultibankLogo from "../assets/MultiBank-Logo.png"

function Header() {
  return (
    <header className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <img src={MultibankLogo} alt="Multibank Logo" height={82} width={181} className="h-auto w-[150px] sm:w-[181px]" />
      <h1 className="text-xl font-bold sm:ml-2 sm:text-2xl">Real Time Trading Dashboard</h1>
    </header>
  )
}

export default Header
