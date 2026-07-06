import { useState, useEffect } from 'react'
import { fetchFromApi } from '../api.js'

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadLeaderboard()
  }, [])

  async function loadLeaderboard() {
    try {
      setLoading(true)
      setError(null)
      const data = await fetchFromApi('leaderboard')
      setLeaderboard(data)
    } catch (err) {
      setError(`Failed to load leaderboard: ${err.message}`)
      setLeaderboard([])
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="loading"><div className="spinner-border"></div></div>
  }

  return (
    <div className="leaderboard-container">
      <h2>Leaderboard</h2>

      {error && <div className="error-message">{error}</div>}

      {leaderboard.length === 0 ? (
        <p className="text-muted">Leaderboard is empty. Start logging workouts to appear here!</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Score</th>
                <th>Team</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, index) => (
                <tr key={entry._id || entry.id}>
                  <td>
                    <strong>#{index + 1}</strong>
                  </td>
                  <td>{entry.username || entry.name || 'Unknown'}</td>
                  <td>
                    <strong>{entry.score || entry.points || 0}</strong>
                  </td>
                  <td>{entry.team || entry.teamName || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
