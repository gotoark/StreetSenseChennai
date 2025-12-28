# Chennai Street Food Assistant - Frontend

This is the React frontend for the Chennai Street Food Assistant application.

## Features

- **Responsive Design**: Works on desktop and mobile devices
- **Chennai-themed UI**: Local color palette and styling
- **Interactive Components**: Mood selector, area selector, and time input
- **Real-time Recommendations**: Connects to the backend API for recommendations
- **Loading States**: Proper loading and error handling

## Components

- `MoodSelector`: Button group for selecting user mood
- `AreaSelector`: Button group for selecting Chennai area
- `TimeInput`: Time picker with preset options
- `RecommendationDisplay`: Shows recommendation results
- `RecommendationCard`: Individual recommendation with local context
- `LoadingSpinner`: Loading indicator
- `ErrorMessage`: Error display component

## Development

```bash
# Install dependencies (from project root)
npm install

# Start development server
npm run dev:frontend

# Build for production
npm run build:frontend

# Start both backend and frontend
npm start
```

## API Integration

The frontend connects to the backend API at `/api/recommend` and includes:
- Request validation
- Error handling
- Loading states
- Proper TypeScript types

## Styling

Uses CSS custom properties for theming with Chennai-inspired colors:
- Primary Orange: #FF6B35
- Primary Red: #D32F2F
- Warm Yellow: #FFC107
- Deep Green: #2E7D32
- Temple Gold: #FFB300

The design is mobile-first and responsive across all screen sizes.