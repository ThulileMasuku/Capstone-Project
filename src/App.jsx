import { useState, useEffect } from 'react'
import WelcomeScreen from './components/WelcomeScreen'
import LoginWorkoutScreen from './components/LoginWorkoutScreen'
import WorkoutHistoryScreen from './components/WorkoutHistoryScreen'
import ProgressOverviewScreen from './components/ProgressOverviewScreen'

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(0)
  const [currentUser, setCurrentUser] = useState(null)
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('fitness_users')
    return saved ? JSON.parse(saved) : {}
  })
  const [workoutHistory, setWorkoutHistory] = useState(() => {
    const saved = localStorage.getItem('fitness_workouts')
    return saved ? JSON.parse(saved) : {}
  })

  // Save workouts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('fitness_workouts', JSON.stringify(workoutHistory))
  }, [workoutHistory])

  // Save users to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('fitness_users', JSON.stringify(users))
  }, [users])

  const handleSignUp = (email, password, fullName) => {
    if (users[email]) {
      alert('Email already registered. Please sign in.')
      return false
    }
    
    const newUser = {
      email,
      password,
      fullName,
      createdAt: new Date().toISOString()
    }
    
    setUsers({
      ...users,
      [email]: newUser
    })
    
    setCurrentUser({
      email,
      fullName
    })
    
    setCurrentScreen(1)
    return true
  }

  const handleSignIn = (email, password) => {
    const user = users[email]
    
    if (!user) {
      alert('Email not found. Please sign up first.')
      return false
    }
    
    if (user.password !== password) {
      alert('Incorrect password.')
      return false
    }
    
    setCurrentUser({
      email,
      fullName: user.fullName
    })
    
    setCurrentScreen(1)
    return true
  }

  const handleSignOut = () => {
    setCurrentUser(null)
    setCurrentScreen(0)
  }

  const handleAddWorkout = (workout) => {
    if (!currentUser) return

    const userWorkouts = workoutHistory[currentUser.email] || []
    const newWorkout = {
      id: Date.now(),
      ...workout
    }
    
    setWorkoutHistory({
      ...workoutHistory,
      [currentUser.email]: [...userWorkouts, newWorkout]
    })
    
    setCurrentScreen(2)
  }

  const handleNavigateToScreen = (screenIndex) => {
    setCurrentScreen(screenIndex)
  }

  const getUserWorkouts = () => {
    if (!currentUser) return []
    return workoutHistory[currentUser.email] || []
  }

  const screens = [
    <WelcomeScreen 
      key="welcome" 
      onSignUp={handleSignUp}
      onSignIn={handleSignIn}
    />,
    <LoginWorkoutScreen 
      key="login" 
      currentUser={currentUser}
      onNavigate={handleNavigateToScreen} 
      onAddWorkout={handleAddWorkout}
      onSignOut={handleSignOut}
    />,
    <WorkoutHistoryScreen 
      key="history" 
      workoutHistory={getUserWorkouts()}
      currentUser={currentUser}
      onNavigate={handleNavigateToScreen}
      onSignOut={handleSignOut}
    />,
    <ProgressOverviewScreen 
      key="progress" 
      workoutHistory={getUserWorkouts()}
      currentUser={currentUser}
      onNavigate={handleNavigateToScreen}
      onSignOut={handleSignOut}
    />
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-200 to-blue-500 flex flex-col">
      {screens[currentScreen]}
    </div>
  )
}
