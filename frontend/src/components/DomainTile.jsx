import React from 'react'
import { motion } from 'framer-motion'
import InviteCodeCard from './InviteCodeCard'

const THRESHOLDS = {
  defi: 1000,
  gaming: 800,
  dev: 900
}

const DOMAIN_CONFIG = {
  defi: {
    name: 'DeFi',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
      </svg>
    ),
    color: 'from-primary-500 to-primary-600',
    wittyLine: 'Trades tell tales—make them epic.',
    bgColor: 'bg-primary-50',
    borderColor: 'border-primary-200'
  },
  gaming: {
    name: 'Gaming',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
    color: 'from-accent-brown to-accent-dark',
    wittyLine: 'GGs stack, gate cracks.',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200'
  },
  dev: {
    name: 'Dev',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    color: 'from-primary-600 to-primary-700',
    wittyLine: 'Ship clean, earn green.',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  }
}

const DomainTile = ({ domain, score, onCopy }) => {
  const config = DOMAIN_CONFIG[domain]
  const threshold = THRESHOLDS[domain]
  const isEligible = score >= threshold
  const deficit = Math.max(0, threshold - score)
  const progressPercentage = Math.min((score / threshold) * 100, 100)

  return (
    <motion.div
      className={`
        relative p-6 rounded-xl border-2 transition-all duration-250 ease-out
        ${config.bgColor} ${config.borderColor}
        hover:shadow-lg hover:-translate-y-1
      `}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ 
        rotateY: 2,
        rotateX: -2,
        transition: { duration: 0.2 }
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${config.color} flex items-center justify-center text-white shadow-md`}>
            <motion.div
              whileHover={{ 
                y: -2,
                transition: { duration: 0.2 }
              }}
            >
              {config.icon}
            </motion.div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-primary-700">{config.name}</h3>
            <p className="text-sm text-primary-500">{config.wittyLine}</p>
          </div>
        </div>
        
        {/* Status Chip */}
        <motion.div
          className={`
            px-3 py-1 rounded-full text-xs font-semibold
            ${isEligible 
              ? 'bg-green-100 text-green-700 border border-green-200' 
              : 'bg-gray-100 text-gray-700 border border-gray-200'
            }
          `}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 500 }}
        >
          {isEligible ? 'Eligible' : 'Locked'}
        </motion.div>
      </div>

      {/* Score Display */}
      <div className="mb-4">
        <motion.div
          className="text-3xl font-bold text-primary-700"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
        >
          {score.toLocaleString()}
        </motion.div>
        <div className="text-sm text-primary-500">
          of {threshold.toLocaleString()} required
        </div>
      </div>

      {/* Progress Ring */}
      <div className="relative mb-4">
        <div className="w-20 h-20 mx-auto">
          <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
            {/* Background circle */}
            <path
              className="stroke-primary-200"
              strokeWidth="3"
              fill="none"
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            {/* Progress circle */}
            <motion.path
              className={`stroke-gradient-to-r ${config.color}`}
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              initial={{ strokeDasharray: "0 100" }}
              animate={{ strokeDasharray: `${progressPercentage} 100` }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-bold text-primary-700">
              {Math.round(progressPercentage)}%
            </span>
          </div>
        </div>
      </div>

      {/* Status Message */}
      <div className="text-center">
        {isEligible ? (
          <p className="text-sm text-green-600 font-medium">Welcome to the exclusive club!</p>
        ) : (
          <p className="text-sm text-gray-600">
            Need <span className="font-bold text-primary-700">{deficit.toLocaleString()}</span> more points to unlock
          </p>
        )}
      </div>

      {/* Invite Code Card */}
      <InviteCodeCard 
        domain={domain} 
        isVisible={isEligible} 
        onCopy={onCopy}
      />
    </motion.div>
  )
}

export default DomainTile
