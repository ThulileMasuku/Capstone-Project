import { useState } from 'react'
import TimerDisplay from './TimerDisplay'

export default function LoginWorkoutScreen({ currentUser, onNavigate, onAddWorkout, onSignOut }) {
  const [exerciseName, setExerciseName] = useState('')
  const [sets, setSets] = useState('5')
  const [reps, setReps] = useState('1')
  const [weight, setWeight] = useState('')
  const [timerStarted, setTimerStarted] = useState(false)
  const [showTimer, setShowTimer] = useState(false)

  const handleStartTimer = () => {
    setShowTimer(true)
    setTimerStarted(true)
  }

  const handleStopTimer = () => {
    setTimerStarted(false)
  }

  const handleSaveWorkout = () => {
    if (exerciseName.trim() && weight) {
      onAddWorkout({
        name: exerciseName,
        sets: parseInt(sets),
        reps: parseInt(reps),
        weight: parseFloat(weight),
        date: new Date().toISOString().split('T')[0]
      })
      resetForm()
    } else {
      alert('Please fill in all fields')
    }
  }

  const resetForm = () => {
    setExerciseName('')
    setSets('5')
    setReps('1')
    setWeight('')
    setShowTimer(false)
    setTimerStarted(false)
  }

  const incrementValue = (value, increment) => {
    return Math.max(1, parseInt(value) + increment).toString()
  }

  return (
    <div className="w-full min-h-screen flex flex-col px-4 sm:px-6 pt-4 sm:pt-6 pb-24 sm:pb-28">
      {/* Header with User Info */}
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-1">Log Workout</h1>
        {currentUser && (
          <p className="text-sm sm:text-base text-blue-700">Welcome, {currentUser.fullName}</p>
        )}
      </div>

      {/* Quick Navigation Button */}
      <div className="mb-6 sm:mb-8 max-w-md mx-auto w-full">
        <button
          onClick={() => onNavigate(3)}
          className="w-full px-4 py-3 sm:py-4 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors text-base sm:text-lg"
        >
          View Progress Overview
        </button>
      </div>

      {/* Form Content */}
      <div className="flex-1 max-w-md mx-auto w-full">
        <div className="space-y-4 sm:space-y-5">
          {/* Exercise Name */}
          <div>
            <label className="block text-sm sm:text-base font-semibold text-blue-900 mb-2">Exercise Name</label>
            <input
              type="text"
              placeholder="e.g., Bench Press, Squats, Deadlifts"
              value={exerciseName}
              onChange={(e) => setExerciseName(e.target.value)}
              className="w-full px-4 py-2.5 sm:py-3 rounded-lg bg-white border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
          </div>

          {/* Sets and Reps */}
          <div className="grid grid-cols-2 gap-4 sm:gap-5">
            <div>
              <label className="block text-sm sm:text-base font-semibold text-blue-900 mb-2">Sets</label>
              <div className="flex items-center justify-between bg-white border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setSets(incrementValue(sets, -1))}
                  className="px-3 sm:px-4 py-2.5 sm:py-3 text-blue-600 hover:bg-blue-50 font-semibold text-lg"
                >
                  −
                </button>
                <input
                  type="text"
                  value={sets}
                  onChange={(e) => setSets(e.target.value || '1')}
                  className="flex-1 px-2 py-2.5 sm:py-3 text-center text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
                />
                <button
                  onClick={() => setSets(incrementValue(sets, 1))}
                  className="px-3 sm:px-4 py-2.5 sm:py-3 text-blue-600 hover:bg-blue-50 font-semibold text-lg"
                >
                  +
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm sm:text-base font-semibold text-blue-900 mb-2">Reps</label>
              <div className="flex items-center justify-between bg-white border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setReps(incrementValue(reps, -1))}
                  className="px-3 sm:px-4 py-2.5 sm:py-3 text-blue-600 hover:bg-blue-50 font-semibold text-lg"
                >
                  −
                </button>
                <input
                  type="text"
                  value={reps}
                  onChange={(e) => setReps(e.target.value || '1')}
                  className="flex-1 px-2 py-2.5 sm:py-3 text-center text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
                />
                <button
                  onClick={() => setReps(incrementValue(reps, 1))}
                  className="px-3 sm:px-4 py-2.5 sm:py-3 text-blue-600 hover:bg-blue-50 font-semibold text-lg"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Weight */}
          <div>
            <label className="block text-sm sm:text-base font-semibold text-blue-900 mb-2">Weight (kg)</label>
            <input
              type="number"
              placeholder="Enter weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              step="0.5"
              className="w-full px-4 py-2.5 sm:py-3 rounded-lg bg-white border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
          </div>

          {/* Timer Display */}
          {showTimer && (
            <TimerDisplay
              isRunning={timerStarted}
              onStop={handleStopTimer}
            />
          )}

          {/* Buttons */}
          <div className="space-y-3 sm:space-y-4 pt-4 sm:pt-6">
            {!timerStarted && (
              <button
                onClick={handleStartTimer}
                className="w-full px-4 py-3 sm:py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-base sm:text-lg"
              >
                Start Timer
              </button>
            )}

            {timerStarted && (
              <button
                onClick={handleStopTimer}
                className="w-full px-4 py-3 sm:py-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors text-base sm:text-lg"
              >
                Stop Timer
              </button>
            )}

            <button
              onClick={handleSaveWorkout}
              className="w-full px-4 py-3 sm:py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors text-base sm:text-lg"
            >
              Save Workout
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 sm:py-4 z-50 shadow-lg">
        <div className="max-w-md mx-auto flex justify-around items-center gap-4">
          <button
            onClick={() => onNavigate(0)}
            className="flex-1 px-3 sm:px-4 py-2 sm:py-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-semibold text-sm sm:text-base"
          >
            Home
          </button>
          <button
            onClick={() => onNavigate(2)}
            className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm sm:text-base"
          >
            History
          </button>
          <button
            onClick={() => onNavigate(3)}
            className="flex-1 px-3 sm:px-4 py-2 sm:py-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-semibold text-sm sm:text-base"
          >
            Progress
          </button>
          <button
            onClick={onSignOut}
            className="flex-1 px-3 sm:px-4 py-2 sm:py-3 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors font-semibold text-sm sm:text-base"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  )
}
