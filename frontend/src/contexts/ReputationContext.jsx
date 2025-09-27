import React, { createContext, useContext, useState, useEffect } from 'react'
import { useActivity } from './ActivityContext'

const ReputationContext = createContext()

export const useReputation = () => {
  const context = useContext(ReputationContext)
  if (!context) {
    throw new Error('useReputation must be used within a ReputationProvider')
  }
  return context
}

export const ReputationProvider = ({ children }) => {
  const { activities } = useActivity()
  const [reputationScores, setReputationScores] = useState({
    defiScore: 0,
    gamingScore: 0,
    devScore: 0,
    totalScore: 0,
    lastUpdated: null,
    isActive: false
  })

  // Calculate reputation scores from activities
  useEffect(() => {
    const calculateScores = () => {
      const scores = {
        defi: 0,
        gaming: 0,
        development: 0
      }

      // Sum up points from each activity type
      activities.forEach(activity => {
        if (activity.type === 'defi' && activity.chainId === 5920) {
          scores.defi += activity.points || 0
        } else if (activity.type === 'gaming' && activity.chainId === 5921) {
          scores.gaming += activity.points || 0
        } else if (activity.type === 'development' && activity.chainId === 5922) {
          scores.development += activity.points || 0
        }
      })

      // Calculate weighted total score (DeFi: 40%, Gaming: 30%, Dev: 30%)
      const totalScore = Math.floor(
        (scores.defi * 0.4) +
        (scores.gaming * 0.3) +
        (scores.development * 0.3)
      )

      const newScores = {
        defiScore: scores.defi,
        gamingScore: scores.gaming,
        devScore: scores.development,
        totalScore: totalScore,
        lastUpdated: activities.length > 0 ? new Date() : null,
        isActive: activities.length > 0
      }

      setReputationScores(newScores)
    }

    calculateScores()
  }, [activities])

  // Get reputation breakdown by chain
  const getChainReputation = (chainId) => {
    const chainActivities = activities.filter(activity => activity.chainId === chainId)
    const totalPoints = chainActivities.reduce((sum, activity) => sum + (activity.points || 0), 0)
    const transactionCount = chainActivities.length
    const lastActivity = chainActivities.length > 0 ? chainActivities[0].timestamp : null

    return {
      totalPoints,
      transactionCount,
      lastActivity,
      activities: chainActivities
    }
  }

  // Get activity statistics
  const getActivityStats = () => {
    const totalTransactions = activities.length
    const totalPoints = activities.reduce((sum, activity) => sum + (activity.points || 0), 0)
    const chainBreakdown = {
      5920: getChainReputation(5920),
      5921: getChainReputation(5921),
      5922: getChainReputation(5922)
    }

    const activeChains = Object.keys(chainBreakdown).filter(
      chainId => chainBreakdown[chainId].transactionCount > 0
    ).length

    return {
      totalTransactions,
      totalPoints,
      activeChains,
      chainBreakdown,
      averagePointsPerTransaction: totalTransactions > 0 ? Math.round(totalPoints / totalTransactions) : 0
    }
  }

  // Get user level based on total score
  const getUserLevel = () => {
    const { totalScore } = reputationScores

    if (totalScore >= 2000) return { level: 'Expert', color: 'purple', icon: '👑' }
    if (totalScore >= 1000) return { level: 'Advanced', color: 'blue', icon: '⭐' }
    if (totalScore >= 500) return { level: 'Intermediate', color: 'green', icon: '🔥' }
    if (totalScore >= 100) return { level: 'Beginner', color: 'yellow', icon: '🌟' }
    return { level: 'Newcomer', color: 'gray', icon: '🎯' }
  }

  // Calculate progress to next level
  const getLevelProgress = () => {
    const { totalScore } = reputationScores
    const thresholds = [0, 100, 500, 1000, 2000]

    let currentLevelIndex = 0
    for (let i = 0; i < thresholds.length; i++) {
      if (totalScore >= thresholds[i]) {
        currentLevelIndex = i
      }
    }

    const nextThreshold = thresholds[currentLevelIndex + 1]
    if (!nextThreshold) {
      return { progress: 100, pointsToNext: 0, nextLevel: 'Max Level' }
    }

    const currentThreshold = thresholds[currentLevelIndex]
    const progress = ((totalScore - currentThreshold) / (nextThreshold - currentThreshold)) * 100
    const pointsToNext = nextThreshold - totalScore

    return {
      progress: Math.round(progress),
      pointsToNext,
      nextLevel: ['Beginner', 'Intermediate', 'Advanced', 'Expert'][currentLevelIndex + 1] || 'Expert'
    }
  }

  const value = {
    reputationScores,
    getChainReputation,
    getActivityStats,
    getUserLevel,
    getLevelProgress
  }

  return (
    <ReputationContext.Provider value={value}>
      {children}
    </ReputationContext.Provider>
  )
}