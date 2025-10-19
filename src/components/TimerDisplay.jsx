import { useState, useEffect } from 'react'

export default function TimerDisplay({ isRunning, onStop }) {
  const [seconds, setSeconds] = useState(0)
  const [minutes, setMinutes] = useState(0)

  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      setSeconds(prev => {
        if (prev === 59) {
          setMinutes(m => m + 1)
          return 0
        }
        return prev + 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isRunning])

  const formatTime = (val) => String(val).padStart(2, '0')

  return (
    <div className="bg-white rounded-lg p-6 text-center my-4">
      <div className="text-4xl font-bold text-blue-600 font-mono">
        {formatTime(minutes)}:{formatTime(seconds)}
      </div>
      <p className="text-gray-600 text-sm mt-2">Rest Time</p>
    </div>
  )
}
