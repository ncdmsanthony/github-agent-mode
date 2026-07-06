import { useState, useEffect } from 'react'
import { fetchFromApi, createInApi } from '../api.js'

export default function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [newUser, setNewUser] = useState({ username: '', email: '' })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    loadUsers()
  }, [])

  async function loadUsers() {
    try {
      setLoading(true)
      setError(null)
      const data = await fetchFromApi('users')
      setUsers(data)
    } catch (err) {
      setError(`Failed to load users: ${err.message}`)
      setUsers([])
    } finally {
      setLoading(false)
    }
  }

  async function handleAddUser(e) {
    e.preventDefault()
    if (!newUser.username || !newUser.email) {
      setError('Username and email are required')
      return
    }

    try {
      setSubmitting(true)
      setError(null)
      const created = await createInApi('users', newUser)
      setUsers([...users, created])
      setNewUser({ username: '', email: '' })
    } catch (err) {
      setError(`Failed to create user: ${err.message}`)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <div className="loading"><div className="spinner-border"></div></div>
  }

  return (
    <div className="users-container">
      <h2>Users</h2>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleAddUser} className="mb-4">
        <div className="row g-2">
          <div className="col-md">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              value={newUser.username}
              onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
              disabled={submitting}
            />
          </div>
          <div className="col-md">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              disabled={submitting}
            />
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Adding...' : 'Add User'}
            </button>
          </div>
        </div>
      </form>

      {users.length === 0 ? (
        <p className="text-muted">No users found. Create one to get started!</p>
      ) : (
        <div className="list-group">
          {users.map((user) => (
            <div key={user._id || user.id} className="list-group-item">
              <h5>{user.username}</h5>
              <p className="mb-0 text-muted">{user.email}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
