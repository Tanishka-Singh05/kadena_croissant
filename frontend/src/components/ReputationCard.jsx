import React from 'react'
import { motion } from 'framer-motion'

const ReputationCard = ({ title, score, chain, color, isLoading, isTotal = false, userLevel, levelProgress }) => {
  const getColorClasses = (color) => {
    const colors = {
      primary: 'from-primary-500 to-primary-600',
      accent: 'from-accent-brown to-accent-dark',
      secondary: 'from-primary-600 to-primary-700',
      gradient: 'from-primary-500 via-accent-brown to-primary-600'
    }
    return colors[color] || colors.primary
  }

  const getChainIcon = (chain) => {
    if (chain === 'all') {
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    }

    const icons = {
      20: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      ),
      21: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
      22: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    }
    return icons[chain] || icons[20]
  }

  return (
    <motion.div
      className="card-glass"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.02, y: -5 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-primary-600">{title}</h3>
        <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${getColorClasses(color)} flex items-center justify-center text-white`}>
          {getChainIcon(chain)}
        </div>
      </div>

      {/* Score */}
      <div className="mb-4">
        {isLoading ? (
          <div className="animate-pulse">
            <div className="h-8 bg-primary-200 rounded mb-2"></div>
            <div className="h-4 bg-primary-100 rounded w-3/4"></div>
          </div>
        ) : (
          <>
            <motion.div
              className={`text-3xl font-bold ${isTotal ? 'text-gradient' : 'text-primary-700'}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
            >
              {score.toLocaleString()}
            </motion.div>
            <div className="text-xs text-primary-500">
              {chain === 'all' ? 'Weighted Average' : `Chain ${chain} Activity`}
            </div>
            {isTotal && userLevel && (
              <div className="flex items-center space-x-2 mt-2">
                <span className="text-lg">{userLevel.icon}</span>
                <span className={`text-sm font-semibold text-${userLevel.color}-600`}>
                  {userLevel.level}
                </span>
              </div>
            )}
          </>
        )}
      </div>

      {/* Progress Bar */}
      <div className="relative">
        <div className="h-2 bg-primary-100 rounded-full overflow-hidden">
          <motion.div
            className={`h-full bg-gradient-to-r ${getColorClasses(color)}`}
            initial={{ width: 0 }}
            animate={{
              width: isTotal && levelProgress
                ? `${levelProgress.progress}%`
                : `${Math.min((score / (isTotal ? 3000 : 1500)) * 100, 100)}%`
            }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>
        <div className="flex justify-between text-xs text-primary-500 mt-1">
          {isTotal && levelProgress ? (
            <>
              <span>Current Level</span>
              <span>{levelProgress.pointsToNext > 0 ? `${levelProgress.pointsToNext} to ${levelProgress.nextLevel}` : 'Max Level'}</span>
            </>
          ) : (
            <>
              <span>0</span>
              <span>{isTotal ? '3000' : '1500'}+</span>
            </>
          )}
        </div>
      </div>

      {/* Chain Badge */}
      {chain !== 'all' && (
        <div className="mt-3 text-center">
          <span className="chain-badge text-xs">
            Chain {chain}
          </span>
        </div>
      )}
    </motion.div>
  )
}

export default ReputationCard