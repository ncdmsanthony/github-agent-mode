import { useState, useEffect } from 'react'
import { fetchFromApi, createInApi } from '../api.js'

export default function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [newWorkout, setNewWorkout] = useState({
    name: '',
    duration: '',
    calories: '',
    userId: '',
  })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    loadWorkouts()
  }, [])

  async function loadWorkouts() {
    try {
      setLoading(true)
      setError(null)
      const data = await fetchFromApi('workouts')
      setWorkouts(data)
    } catch (err) {
      setError(`Failed to load workouts: ${err.message}`)
      setWorkouts([])
    } finally {
      setLoading(false)
    }
  }

  async function handleAddWorkout(e) {
    e.preventDefault()
    if (!newWorkout.name || !newWorkout.userId) {
      setError('Workout name and user are required')
      return
    }

    try {
      setSubmitting(true)
      setError(null)
      const created = await createInApi('workouts', newWorkout)
      setWorkouts([...workouts, created])
      setNewWorkout({ name: '', duration: '', calories: '', userId: '' })
    } catch (err) {
      setError(`Failed to create workout: ${err.message}`)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <div className="loading"><div className="spinner-border"></div></div>
  }

  return (
    <div className="workouts-container">
      <h2>Workouts</h2>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleAddWorkout} className="mb-4">
        <div className="row g-2">
          <div className="col-md">
            <input
              type="text"
              className="form-control"
              placeholder="Workout name"
              value={newWorkout.name}
              onChange={(e) => setNewWorkout({ ...newWorkout, name: e.target.value })}
              disabled={submitting}
            />
          </div>
          <div className="col-md">
            <input
              type="number"
              className="form-control"
              placeholder="Duration (minutes)"
              value={newWorkout.duration}
              onChange={(e) => setNewWorkout({ ...newWorkout, duration: e.target.value })}
              disabled={submitting}
            />
          </div>
          <div className="col-md">
            <input
              type="number"
              className="form-control"
              placeholder="Calories burned"
              value={newWorkout.calories}
              onChange={(e) => setNewWorkout({ ...newWorkout, calories: e.target.value })}
              disabled={submitting}
            />
          </div>
          <div className="col-md">
            <input
              type="text"
              className="form-control"
              placeholder="User ID"
              value={newWorkout.userId}
              onChange={(e) => setNewWorkout({ ...newWorkout, userId: e.target.value })}
              disabled={submitting}
            />
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Adding...' : 'Add Workout'}
            </button>
          </div>
        </div>
      </form>

      {workouts.length === 0 ? (
        <p className="text-muted">No workouts found. Log one to get started!</p>
      ) : (
        <div className="list-group">
          {workouts.map((workout) => (
            <div key={workout._id || workout.id} className="list-group-item">
              <h5>{workout.name}</h5>
              <div className="row">
                {workout.duration && (
                  <div className="col-md-4">
                    <small><strong>Duration:</strong> {workout.duration} minutes</small>
                  </div>
                )}
                {workout.calories && (
                  <div className="col-md-4">
                    <small><strong>Calories:</strong> {workout.calories} kcal</small>
                  </div>
                )}
                <div className="col-md-4">
                  <small className="text-muted"><strong>User:</strong> {workout.userId}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
