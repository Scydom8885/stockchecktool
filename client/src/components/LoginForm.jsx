import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!username || !password) {
      setError('Please enter both username and password')
      return
    }

    setLoading(true)
    try {
      const result = await onLogin(username, password)
      if (!result.success) {
        setError(result.error || 'Invalid username or password')
      }
    } catch (error) {
      setError('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">
            Stock Check Tool
          </h1>
          <p className="text-textDark">Please login to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username Input */}
          <div>
            <label className="block text-textDark font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border-2 border-gray-300 rounded-lg p-3 text-textDark focus:border-primary focus:outline-none"
              placeholder="Enter your username"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-textDark font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-2 border-gray-300 rounded-lg p-3 text-textDark focus:border-primary focus:outline-none"
              placeholder="Enter your password"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {loading ? (
              <span>
                <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
                Logging in...
              </span>
            ) : (
              'Login'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
