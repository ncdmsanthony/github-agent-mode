import './App.css'

function App() {
  return (
    <main className="app-shell">
      <section className="hero-card card shadow-sm">
        <div className="card-body p-4 p-md-5">
          <p className="text-uppercase fw-semibold text-primary mb-2">OctoFit Tracker</p>
          <h1 className="display-5 fw-bold mb-3">Train smarter with a connected fitness experience.</h1>
          <p className="lead text-muted mb-4">
            Track workouts, manage teams, and challenge your community from one modern app.
          </p>
          <div className="d-flex flex-wrap gap-3">
            <a className="btn btn-primary btn-lg" href="https://vite.dev/" target="_blank" rel="noreferrer">
              Explore the stack
            </a>
            <a className="btn btn-outline-secondary btn-lg" href="https://react.dev/" target="_blank" rel="noreferrer">
              Learn React 19
            </a>
          </div>
        </div>
      </section>

      <section className="row g-4 mt-2">
        <article className="col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h2 className="h5">Activity tracking</h2>
              <p className="text-muted">Log runs, lifts, and recovery streaks in one place.</p>
            </div>
          </div>
        </article>
        <article className="col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h2 className="h5">Team goals</h2>
              <p className="text-muted">Coordinate squads and compare weekly progress.</p>
            </div>
          </div>
        </article>
        <article className="col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h2 className="h5">Leaderboard</h2>
              <p className="text-muted">Keep motivation high with friendly competition.</p>
            </div>
          </div>
        </article>
      </section>
    </main>
  )
}

export default App
