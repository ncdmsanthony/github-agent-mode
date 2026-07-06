# Octofit Tracker - Frontend (Presentation Tier)

React 19 + Vite frontend for the Octofit Tracker multi-tier application.

## Architecture

- **Framework**: React 19 with Vite
- **Routing**: react-router-dom
- **Styling**: Bootstrap 5
- **API Communication**: Vite environment variables + fetch API

## Environment Setup

### Required Configuration

The frontend requires a GitHub Codespace name to connect to the API tier. This is configured via the `VITE_CODESPACE_NAME` environment variable.

#### For GitHub Codespaces:

1. Copy the example environment file:
   ```bash
   cd octofit-tracker/frontend
   cp .env.local.example .env.local
   ```

2. Update `.env.local` with your Codespace name:
   ```
   VITE_CODESPACE_NAME=your-actual-codespace-name
   ```

   You can find your Codespace name by:
   - Looking at the browser URL (format: `https://[codespace-name]-[port].app.github.dev`)
   - Or checking GitHub Codespaces dashboard

#### For Local Development:

If `VITE_CODESPACE_NAME` is not defined, the frontend will fall back to `http://localhost:8000/api` and display a warning in the console.

Create `.env.local`:
```
VITE_CODESPACE_NAME=localhost
```

### Environment Variable Reference

| Variable | Type | Required | Description |
|----------|------|----------|-------------|
| `VITE_CODESPACE_NAME` | String | Yes (for Codespaces) | GitHub Codespace name for API endpoint |

## Installation & Development

### Install Dependencies

```bash
cd octofit-tracker/frontend
npm install
```

### Start Development Server

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Build for Production

```bash
npm build
```

## API Integration

### Base API URL

The frontend automatically constructs API URLs using the environment variable:

```
https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api
```

### API Utilities

The `src/api.js` file provides helper functions for API communication:

```javascript
// Fetch data
const items = await fetchFromApi('users')

// Create item
const newItem = await createInApi('users', { username: 'john', email: 'john@example.com' })

// Update item
const updated = await updateInApi('users', 'user-id', { email: 'newemail@example.com' })

// Delete item
await deleteFromApi('users', 'user-id')
```

### Response Handling

The API utilities automatically handle paginated and array responses:

- Direct arrays: `[{...}, {...}]`
- Paginated responses: `{ results: [{...}, {...}] }`
- Alternative format: `{ data: [{...}, {...}] }`

All are normalized to arrays.

## Available Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Home | Welcome page |
| `/users` | Users | User management |
| `/activities` | Activities | Activity logging |
| `/workouts` | Workouts | Workout tracking |
| `/teams` | Teams | Team creation & management |
| `/leaderboard` | Leaderboard | Competitive rankings |

## Components

### Users
- Display list of users
- Add new users
- Fetch from `GET /api/users`
- Create via `POST /api/users`

### Activities
- Log user activities
- Display activities list
- Fetch from `GET /api/activities`
- Create via `POST /api/activities`

### Workouts
- Log workouts with duration and calories
- Display workout history
- Fetch from `GET /api/workouts`
- Create via `POST /api/workouts`

### Teams
- Create and manage teams
- View team information
- Fetch from `GET /api/teams`
- Create via `POST /api/teams`

### Leaderboard
- Display ranked users/teams
- View scores and team assignments
- Fetch from `GET /api/leaderboard`

## Troubleshooting

### "Cannot find module 'react'" or similar

Run `npm install` to ensure all dependencies are installed.

### "Failed to load activities" or similar errors

1. **Check VITE_CODESPACE_NAME**: Ensure it's defined in `.env.local`
2. **Check Backend**: Verify the API tier (port 8000) is running
3. **Check Console**: Look for detailed error messages in browser DevTools
4. **Check Network**: Ensure forwarded ports are correctly configured

### API returns "undefined" URL

If you see URLs like `https://undefined-8000.app.github.dev/...`:
1. The `VITE_CODESPACE_NAME` is not defined
2. Create/update `.env.local` with the correct Codespace name
3. Restart the dev server: `npm run dev`

## Project Structure

```
frontend/
├── index.html              # Entry HTML
├── package.json            # Dependencies
├── vite.config.js          # Vite configuration
├── .env.local.example      # Environment variables example
├── src/
│   ├── main.jsx            # Application entry point
│   ├── App.jsx             # Root component with routing
│   ├── api.js              # API utilities and configuration
│   ├── index.css           # Global styles
│   └── components/
│       ├── Users.jsx       # User component
│       ├── Activities.jsx  # Activities component
│       ├── Workouts.jsx    # Workouts component
│       ├── Teams.jsx       # Teams component
│       └── Leaderboard.jsx # Leaderboard component
└── dist/                   # Build output (created by `npm run build`)
```

## Related Documentation

- [Backend Setup](../backend/README.md)
- [Octofit Tracker Story](../../docs/octofit_story.md)
