# Chennai Street Food Assistant

A personalized Chennai street food recommendation system that suggests the perfect street food based on your mood, location, and time of day.

## Features

- **Mood-based recommendations**: Get food suggestions based on your current mood
- **Area-specific specialties**: Discover local favorites in different Chennai areas
- **Time-aware filtering**: Only see foods available at your current time
- **Safety considerations**: Includes weather and time-based safety notes
- **Local context**: Authentic Chennai expressions and cultural tips
- **Mobile-friendly**: Responsive design for all devices

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm

### Installation
```bash
npm install
```

### Running the Application

**Start both backend and frontend:**
```bash
npm start
```

This will start:
- Backend API server on `http://localhost:3000`
- Frontend development server on `http://localhost:5173`

**Or run individually:**

Backend only:
```bash
npm run server
```

Frontend only:
```bash
npm run dev:frontend
```

### API Usage

**Get Recommendations:**
```bash
curl -X POST http://localhost:3000/api/recommend \
  -H "Content-Type: application/json" \
  -d '{
    "mood": "rainy_evening",
    "area": "t_nagar", 
    "time": "18:30"
  }'
```

**Available Endpoints:**
- `GET /health` - Health check
- `GET /api/moods` - Available mood options
- `GET /api/areas` - Available Chennai areas
- `POST /api/recommend` - Get food recommendations

### Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

### Building for Production

```bash
# Build backend
npm run build

# Build frontend
npm run build:frontend
```

## Project Structure

```
├── src/                    # Backend source code
│   ├── data/              # Food database and data models
│   ├── input/             # Input validation
│   ├── recommendation/    # Recommendation engine
│   ├── response/          # Response formatting
│   ├── rules/             # Business rules engine
│   └── __tests__/         # Backend tests
├── frontend/              # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── services/      # API services
│   │   ├── styles/        # CSS styles
│   │   └── types/         # TypeScript types
└── .kiro/specs/          # Feature specifications
```

## Available Moods

- `rainy_evening` - Rainy Evening Vibes
- `hungry_heavy` - Really Hungry  
- `light_snack` - Light Snack
- `stress_relief` - Need Comfort Food
- `midnight_hunger` - Midnight Cravings

## Covered Areas

- T Nagar
- Anna Nagar
- Mylapore
- Triplicane
- Velachery
- Tambaram
- OMR
- Parrys Corner

## Technology Stack

- **Backend**: Node.js, Express, TypeScript
- **Frontend**: React, TypeScript, Vite
- **Testing**: Jest, fast-check (property-based testing)
- **Development**: Concurrently, ts-node

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `npm test`
5. Submit a pull request

## License

MIT License
