export default function ProgressOverviewScreen({ workoutHistory, currentUser, onNavigate, onSignOut }) {
  const calculateStats = () => {
    if (workoutHistory.length === 0) {
      return {
        totalWorkouts: 0,
        totalSets: 0,
        totalReps: 0,
        averageWeight: 0
      }
    }

    const totalWorkouts = workoutHistory.length
    const totalSets = workoutHistory.reduce((sum, w) => sum + w.sets, 0)
    const totalReps = workoutHistory.reduce((sum, w) => sum + w.reps, 0)
    const averageWeight = workoutHistory.reduce((sum, w) => sum + w.weight, 0) / totalWorkouts

    return {
      totalWorkouts,
      totalSets,
      totalReps,
      averageWeight: averageWeight.toFixed(1)
    }
  }

  const stats = calculateStats()

  return (
    <div className="w-full min-h-screen flex flex-col px-4 sm:px-6 pt-4 sm:pt-6 pb-24 sm:pb-28">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-1">Progress Overview</h1>
        {currentUser && (
          <p className="text-sm sm:text-base text-blue-700">{currentUser.fullName}</p>
        )}
      </div>

      {/* Quick Navigation Buttons */}
      <div className="mb-6 sm:mb-8 max-w-md mx-auto w-full">
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          <button
            onClick={() => onNavigate(0)}
            className="px-3 sm:px-4 py-3 sm:py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
          >
            Go to Home
          </button>
          <button
            onClick={() => onNavigate(1)}
            className="px-3 sm:px-4 py-3 sm:py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors text-sm sm:text-base"
          >
            Log Workout
          </button>
          <button
            onClick={() => onNavigate(2)}
            className="px-3 sm:px-4 py-3 sm:py-4 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors text-sm sm:text-base"
          >
            History
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="flex-1 max-w-md mx-auto w-full">
        <div className="grid grid-cols-2 gap-4 sm:gap-5 mb-6 sm:mb-8">
          <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200">
            <p className="text-gray-600 text-xs sm:text-sm font-semibold uppercase tracking-wide">Total Workouts</p>
            <p className="text-3xl sm:text-4xl font-bold text-blue-600 mt-2">{stats.totalWorkouts}</p>
          </div>

          <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200">
            <p className="text-gray-600 text-xs sm:text-sm font-semibold uppercase tracking-wide">Total Sets</p>
            <p className="text-3xl sm:text-4xl font-bold text-blue-600 mt-2">{stats.totalSets}</p>
          </div>

          <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200">
            <p className="text-gray-600 text-xs sm:text-sm font-semibold uppercase tracking-wide">Total Reps</p>
            <p className="text-3xl sm:text-4xl font-bold text-blue-600 mt-2">{stats.totalReps}</p>
          </div>

          <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200">
            <p className="text-gray-600 text-xs sm:text-sm font-semibold uppercase tracking-wide">Avg Weight</p>
            <p className="text-3xl sm:text-4xl font-bold text-blue-600 mt-2">{stats.averageWeight}kg</p>
          </div>
        </div>

        {/* Message if no workouts */}
        {workoutHistory.length === 0 && (
          <div className="text-center py-8 sm:py-12">
            <p className="text-gray-600 text-base sm:text-lg mb-4">Start logging workouts to see your progress</p>
            <button
              onClick={() => onNavigate(1)}
              className="px-6 sm:px-8 py-2.5 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm sm:text-base"
            >
              Log Workout
            </button>
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
            className="flex-1 px-3 sm:px-4 py-2 sm:py-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-semibold text-sm sm:text-base"
          >
            Log
          </button>
          <button
            onClick={() => onNavigate(2)}
            className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm sm:text-base"
          >
            History
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
