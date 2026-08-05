# FishLog - Fishing Catch Report Web App

A comprehensive fishing logbook with integrated tide tables, weather forecasts, and solunar predictions.

## Features

- 🎣 **Catch Logging** - Record species, weight, length, location, bait, technique, conditions
- 🌊 **Tide Tables** - NOAA-powered predictions for 3,000+ stations (7-day forecasts)
- 🌤️ **Weather & Solunar** - Real-time conditions, forecasts, moon phases, feeding periods
- 📍 **Fishing Spots** - Discover and save productive locations
- 📊 **Statistics** - Analyze patterns by species, time, tide, moon, weather
- 📱 **Responsive** - Works on mobile, tablet, desktop
- 🔄 **Offline-Ready** - Log catches without signal, syncs when online

## Tech Stack

- **Frontend**: React 19 + TypeScript + Vite + Tailwind CSS
- **Backend**: Node.js + Express + TypeScript
- **Database**: SQLite (better-sqlite3) with WAL mode
- **APIs**: NOAA CO-OPS (tides), OpenWeatherMap (weather), Nominatim (geocoding)
- **Charts**: Chart.js

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone and install dependencies
cd fishing-catch-app
npm install

# Copy environment file and add API keys (optional)
cp .env.example .env

# Start development servers (client + server)
npm run dev
```

The app will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000

### Production Build

```bash
npm run build
npm start
```

## API Keys (Optional)

The app works without API keys using mock data, but for real data:

1. **OpenWeatherMap** - Get free key at [openweathermap.org/api](https://openweathermap.org/api)
2. **NOAA** - No key required for basic tide data

Add keys to `.env`:
```env
OPENWEATHER_API_KEY=your_key_here
```

## Project Structure

```
fishing-catch-app/
├── src/
│   ├── client/          # React frontend
│   │   ├── components/  # Reusable UI components
│   │   ├── hooks/       # Custom React hooks
│   │   ├── pages/       # Page components
│   │   ├── App.tsx      # Main app with routing
│   │   └── main.tsx     # Entry point
│   ├── server/          # Express backend
│   │   ├── api/         # API routes
│   │   ├── database.ts  # SQLite database layer
│   │   └── index.ts     # Server entry point
│   └── shared/          # Shared TypeScript types
├── data/                # SQLite database (auto-created)
├── .env                 # Environment variables
└── package.json
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/catches` | List catches with filters & pagination |
| POST | `/api/catches` | Create new catch |
| GET | `/api/catches/:id` | Get single catch |
| PUT | `/api/catches/:id` | Update catch |
| DELETE | `/api/catches/:id` | Delete catch |
| GET | `/api/catches/stats` | Get statistics |
| GET | `/api/tides` | Get tide predictions |
| GET | `/api/weather` | Get weather & solunar data |
| GET | `/api/locations/search` | Search locations |
| GET | `/api/locations/reverse` | Reverse geocode |
| GET | `/api/spots` | Get fishing spots |
| POST | `/api/spots` | Create fishing spot |

## Database Schema

Key tables:
- `catches` - Catch records with all details
- `tide_stations` - NOAA station metadata
- `weather_cache` - Cached weather data (30 min TTL)
- `tide_cache` - Cached tide predictions (24 hr TTL)
- `fishing_spots` - User-submitted fishing locations

## License

MIT