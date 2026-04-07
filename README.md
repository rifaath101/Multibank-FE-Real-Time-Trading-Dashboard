# Multibank FE — Real-Time Trading Dashboard

Frontend for a trading-style dashboard: browse tickers, select one, and view a price chart. Data is **mocked on the client** (no backend required for local development).

## Overview

- **Stack:** React 19, TypeScript, Vite 8, Tailwind CSS v4, Recharts, Zustand.
- **Features:**
  - Basic **login UI** gate before the dashboard.
  - Ticker list with live-style price updates via a **mock interval feed** (not a real WebSocket).
  - **Zustand** store for tickers, selection, and baseline prices used for change vs initial.
  - **Recharts** line chart for the selected ticker.
- **Data:** Static mock tickers in `src/mocks/tickers.ts`.

## Login (Demo Credentials)

- You must sign in to access the trading dashboard.
- Demo credentials:
  - **Username:** `rifaath`
  - **Password:** `123`
- Failed login behavior:
  - Incorrect credentials show: `User not found`
  - 3 failed attempts triggers a 1-minute lockout before retrying
  - Lockout state is persisted in browser storage, so refreshing the page does not reset the timer

## Prerequisites

- **Node.js** 20+ (or current LTS) and **npm**.

## Setup

1. Clone the repository and enter the project directory.

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the dev server:

   ```bash
   npm run dev
   ```

4. Open the URL Vite prints (usually `http://localhost:5173`).

## Scripts

| Command           | Description                             |
| ----------------- | --------------------------------------- |
| `npm run dev`     | Dev server with HMR                     |
| `npm run build`   | Typecheck + production build to `dist/` |
| `npm run preview` | Serve the production build locally      |
| `npm run lint`    | Run ESLint                              |
| `npm run test`    | Run Vitest test suite once              |
| `npm run test:watch` | Run Vitest in watch mode             |

## Test Coverage

- Test runner: **Vitest** + **React Testing Library** (`tests/` folder).
- Current integration coverage includes:
  - **Login flow** (`tests/Login.test.tsx`)
    - Invalid credentials show `User not found`
    - Lockout after 3 failed attempts
    - Lockout persists across refresh and unlocks after 60s
    - Valid credentials trigger successful login
  - **App auth gate** (`tests/App.test.tsx`)
    - Successful login transitions from login screen to dashboard
  - **Dashboard behavior** (`tests/TradingDashboard.test.tsx`)
    - Renders header, chart area, and tickers list
    - Ticker click updates selected symbol and chart context
    - Empty ticker state renders nothing safely

## Project layout (high level)

```text
src/
  components/     # UI (Header, TickersList, StockLineChart, …)
  hooks/          # marketDataInitialization.ts → useInitializeMarketDataFromMocks
  lib/            # e.g. mockMarketFeed (interval → store updates)
  mocks/          # Mock ticker data
  store/          # Zustand market store
tests/
  *.test.tsx      # Integration tests (login, app flow, dashboard)
  setup.ts        # Testing setup (jest-dom matchers)
```
