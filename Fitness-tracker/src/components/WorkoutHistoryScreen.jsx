import { useState } from 'react'

export default function WorkoutHistoryScreen({ workoutHistory, currentUser, onNavigate, onSignOut }) {
  const [sortBy, setSortBy] = useState('recent')

  const sortedWorkouts = [...workoutHistory].sort((a, b) => {
    if (sortBy === 'recent') {
      return new Date(b.date) - new Date(a.date)
    }
    return 0
  })

  return (
    <div className="w-full min-h-screen flex flex-col px-4 sm:px-6 pt-4 sm:pt-6 pb-24 sm:pb-28">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-1">Workout History</h1>
        {currentUser && (
          <p className="text-sm sm:text-base text-blue-700">{currentUser.fullName}</p>
        )}
      </div>

      {/* Sort Options */}
      <div className="mb-6 sm:mb-8 max-w-md mx-auto w-full">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full px-4 py-2.5 sm:py-3 rounded-lg bg-white border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
        >
          <option value="recent">Most Recent</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      {/* Content */}
      <div className="flex-1 max-w-md mx-auto w-full">
        {sortedWorkouts.length === 0 ? (
          <div className="text-center py-12 sm:py-16">
            <p className="text-gray-600 text-base sm:text-lg mb-4">No workouts logged yet</p>
            <button
              onClick={() => onNavigate(1)}
              className="px-6 sm:px-8 py-2.5 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm sm:text-base"
            >
              Log Your First Workout
            </button>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-5">
            {sortedWorkouts.map((workout) => (
              <div key={workout.id} className="bg-white rounded-lg p-4 sm:p-5 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3 sm:mb-4">
                  <h3 className="font-semibold text-blue-900 text-base sm:text-lg">{workout.name}</h3>
                  <span className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{workout.date}</span>
                </div>
                
                <div className="grid grid-cols-3 gap-3 sm:gap-4 text-sm sm:text-base">
                  <div className="bg-blue-50 rounded-lg p-2.5 sm:p-3 text-center">
                    <p className="text-gray-600 text-xs sm:text-sm">Sets</p>
                    <p className="font-bold text-blue-900 text-lg sm:text-2xl">{workout.sets}</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-2.5 sm:p-3 text-center">
                    <p className="text-gray-600 text-xs sm:text-sm">Reps</p>
                    <p className="font-bold text-blue-900 text-lg sm:text-2xl">{workout.reps}</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-2.5 sm:p-3 text-center">
                    <p className="text-gray-600 text-xs sm:text-sm">Weight</p>
                    <p className="font-bold text-blue-900 text-lg sm:text-2xl">{workout.weight}kg</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
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
            onClick={() => onNavigate(1)}
            className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm sm:text-base"
          >
            Log
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
