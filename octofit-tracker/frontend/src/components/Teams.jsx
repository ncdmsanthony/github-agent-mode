import { useState, useEffect } from 'react'
import { fetchFromApi, createInApi } from '../api.js'

export default function Teams() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [newTeam, setNewTeam] = useState({
    name: '',
    description: '',
  })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    loadTeams()
  }, [])

  async function loadTeams() {
    try {
      setLoading(true)
      setError(null)
      const data = await fetchFromApi('teams')
      setTeams(data)
    } catch (err) {
      setError(`Failed to load teams: ${err.message}`)
      setTeams([])
    } finally {
      setLoading(false)
    }
  }

  async function handleAddTeam(e) {
    e.preventDefault()
    if (!newTeam.name) {
      setError('Team name is required')
      return
    }

    try {
      setSubmitting(true)
      setError(null)
      const created = await createInApi('teams', newTeam)
      setTeams([...teams, created])
      setNewTeam({ name: '', description: '' })
    } catch (err) {
      setError(`Failed to create team: ${err.message}`)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <div className="loading"><div className="spinner-border"></div></div>
  }

  return (
    <div className="teams-container">
      <h2>Teams</h2>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleAddTeam} className="mb-4">
        <div className="row g-2">
          <div className="col-md">
            <input
              type="text"
              className="form-control"
              placeholder="Team name"
              value={newTeam.name}
              onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
              disabled={submitting}
            />
          </div>
          <div className="col-md">
            <input
              type="text"
              className="form-control"
              placeholder="Description"
              value={newTeam.description}
              onChange={(e) => setNewTeam({ ...newTeam, description: e.target.value })}
              disabled={submitting}
            />
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Creating...' : 'Create Team'}
            </button>
          </div>
        </div>
      </form>

      {teams.length === 0 ? (
        <p className="text-muted">No teams found. Create one to get started!</p>
      ) : (
        <div className="list-group">
          {teams.map((team) => (
            <div key={team._id || team.id} className="list-group-item">
              <h5>{team.name}</h5>
              {team.description && <p>{team.description}</p>}
              {team.members && (
                <small className="text-muted">Members: {team.members.length}</small>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
