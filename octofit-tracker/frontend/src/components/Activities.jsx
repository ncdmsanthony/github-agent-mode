import { useState, useEffect } from 'react'
import { fetchFromApi, createInApi } from '../api.js'

export default function Activities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [newActivity, setNewActivity] = useState({
    name: '',
    description: '',
    userId: '',
  })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    loadActivities()
  }, [])

  async function loadActivities() {
    try {
      setLoading(true)
      setError(null)
      const data = await fetchFromApi('activities')
      setActivities(data)
    } catch (err) {
      setError(`Failed to load activities: ${err.message}`)
      setActivities([])
    } finally {
      setLoading(false)
    }
  }

  async function handleAddActivity(e) {
    e.preventDefault()
    if (!newActivity.name || !newActivity.userId) {
      setError('Activity name and user are required')
      return
    }

    try {
      setSubmitting(true)
      setError(null)
      const created = await createInApi('activities', newActivity)
      setActivities([...activities, created])
      setNewActivity({ name: '', description: '', userId: '' })
    } catch (err) {
      setError(`Failed to create activity: ${err.message}`)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <div className="loading"><div className="spinner-border"></div></div>
  }

  return (
    <div className="activities-container">
      <h2>Activities</h2>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleAddActivity} className="mb-4">
        <div className="row g-2">
          <div className="col-md">
            <input
              type="text"
              className="form-control"
              placeholder="Activity name"
              value={newActivity.name}
              onChange={(e) => setNewActivity({ ...newActivity, name: e.target.value })}
              disabled={submitting}
            />
          </div>
          <div className="col-md">
            <input
              type="text"
              className="form-control"
              placeholder="Description"
              value={newActivity.description}
              onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
              disabled={submitting}
            />
          </div>
          <div className="col-md">
            <input
              type="text"
              className="form-control"
              placeholder="User ID"
              value={newActivity.userId}
              onChange={(e) => setNewActivity({ ...newActivity, userId: e.target.value })}
              disabled={submitting}
            />
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Adding...' : 'Add Activity'}
            </button>
          </div>
        </div>
      </form>

      {activities.length === 0 ? (
        <p className="text-muted">No activities found. Log one to get started!</p>
      ) : (
        <div className="list-group">
          {activities.map((activity) => (
            <div key={activity._id || activity.id} className="list-group-item">
              <h5>{activity.name}</h5>
              {activity.description && <p>{activity.description}</p>}
              <small className="text-muted">User: {activity.userId}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
