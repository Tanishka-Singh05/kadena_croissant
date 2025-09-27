import React, { createContext, useContext, useState, useEffect } from 'react'

const ActivityContext = createContext()

export const useActivity = () => {
  const context = useContext(ActivityContext)
  if (!context) {
    throw new Error('useActivity must be used within an ActivityProvider')
  }
  return context
}

export const ActivityProvider = ({ children }) => {
  const [activities, setActivities] = useState([])

  // Load activities from localStorage on mount
  useEffect(() => {
    const savedActivities = localStorage.getItem('chainweb-activities')
    if (savedActivities) {
      try {
        setActivities(JSON.parse(savedActivities))
      } catch (error) {
        console.error('Error loading activities:', error)
      }
    }
  }, [])

  // Save activities to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('chainweb-activities', JSON.stringify(activities))
  }, [activities])

  const addActivity = (activity) => {
    const newActivity = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...activity
    }

    setActivities(prev => [newActivity, ...prev].slice(0, 50)) // Keep only last 50 activities
  }

  const getActivitiesByChain = (chainId) => {
    return activities.filter(activity => activity.chainId === chainId)
  }

  const getRecentActivities = (limit = 10) => {
    return activities.slice(0, limit)
  }

  const clearActivities = () => {
    setActivities([])
    localStorage.removeItem('chainweb-activities')
  }

  const formatTimestamp = (timestamp) => {
    const now = new Date()
    const activityTime = new Date(timestamp)
    const diffMs = now - activityTime
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
    return activityTime.toLocaleDateString()
  }

  const getChainName = (chainId) => {
    const chainNames = {
      5920: 'DeFi Chain',
      5921: 'Gaming Chain',
      5922: 'Dev Chain'
    }
    return chainNames[chainId] || `Chain ${chainId}`
  }

  const getActivityIcon = (type) => {
    const icons = {
      defi: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
      gaming: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      development: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      default: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    }
    return icons[type] || icons.default
  }

  const calculateReputationPoints = (chainId, txHash) => {
    // Simple point calculation based on chain
    const basePoints = {
      5920: 15, // DeFi
      5921: 25, // Gaming
      5922: 100 // Development
    }

    // Add some randomness based on transaction hash
    const hashNum = parseInt(txHash.slice(-2), 16)
    const bonus = Math.floor(hashNum / 16) * 5

    return (basePoints[chainId] || 10) + bonus
  }

  const value = {
    activities,
    addActivity,
    getActivitiesByChain,
    getRecentActivities,
    clearActivities,
    formatTimestamp,
    getChainName,
    getActivityIcon,
    calculateReputationPoints
  }

  return (
    <ActivityContext.Provider value={value}>
      {children}
    </ActivityContext.Provider>
  )
}