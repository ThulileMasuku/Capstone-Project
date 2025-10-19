import { useState } from 'react'

export default function WelcomeScreen({ onSignUp, onSignIn }) {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (isSignUp) {
      if (!fullName.trim()) {
        alert('Please enter your full name')
        return
      }
      if (password !== confirmPassword) {
        alert('Passwords do not match')
        return
      }
      if (password.length < 6) {
        alert('Password must be at least 6 characters')
        return
      }
      onSignUp(email, password, fullName)
    } else {
      onSignIn(email, password)
    }
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-4 py-8 sm:py-12">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-2">WORKLYTICS</h1>
          <p className="text-blue-700 text-sm sm:text-base">Fitness Tracker</p>
        </div>

        {/* Logo */}
        <div className="mb-8 sm:mb-10 flex justify-center">
          <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-full flex items-center justify-center shadow-lg">
            <div className="text-blue-600 text-3xl sm:text-4xl font-bold">W</div>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white bg-opacity-90 rounded-xl p-6 sm:p-8 shadow-lg">
          <h2 className="text-xl sm:text-2xl font-bold text-blue-900 mb-6 text-center">
            {isSignUp ? 'Create Account' : 'Sign In'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name - Sign Up Only */}
            {isSignUp && (
              <div>
                <label className="block text-sm font-semibold text-blue-900 mb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-blue-900 mb-2">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-blue-900 mb-2">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>

            {/* Confirm Password - Sign Up Only */}
            {isSignUp && (
              <div>
                <label className="block text-sm font-semibold text-blue-900 mb-2">Confirm Password</label>
                <input
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors mt-6"
            >
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </button>
          </form>

          {/* Toggle Sign Up / Sign In */}
          <div className="mt-6 text-center">
            <p className="text-gray-700 text-sm">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp)
                  setEmail('')
                  setPassword('')
                  setFullName('')
                  setConfirmPassword('')
                }}
                className="ml-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
