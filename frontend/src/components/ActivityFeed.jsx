import React from 'react'
import { motion } from 'framer-motion'

const ActivityFeed = ({ chain }) => {
  // Mock activity data
  const activities = [
    {
      id: 1,
      type: 'transaction',
      description: 'DeFi swap transaction',
      points: '+15 points',
      timestamp: '2 hours ago',
      chain: 20,
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      )
    },
    {
      id: 2,
      type: 'achievement',
      description: 'Gaming achievement unlocked',
      points: '+25 points',
      timestamp: '5 hours ago',
      chain: 21,
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 3,
      type: 'deployment',
      description: 'Smart contract deployed',
      points: '+100 points',
      timestamp: '1 day ago',
      chain: 22,
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      )
    },
    {
      id: 4,
      type: 'liquidity',
      description: 'Liquidity provision',
      points: '+30 points',
      timestamp: '2 days ago',
      chain: 20,
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    {
      id: 5,
      type: 'nft',
      description: 'NFT trade completed',
      points: '+8 points',
      timestamp: '3 days ago',
      chain: 21,
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V1a1 1 0 011-1h2a1 1 0 011 1v3M7 4H5a1 1 0 00-1 1v16a1 1 0 001 1h14a1 1 0 001-1V5a1 1 0 00-1-1h-2M7 4h10M9 9h6m-6 4h6" />
        </svg>
      )
    }
  ]

  const getChainColor = (chainId) => {
    const colors = {
      20: 'bg-primary-500',
      21: 'bg-accent-brown',
      22: 'bg-primary-600'
    }
    return colors[chainId] || 'bg-gray-500'
  }

  const getChainName = (chainId) => {
    const names = {
      20: 'DeFi',
      21: 'Gaming',
      22: 'Dev'
    }
    return names[chainId] || `Chain ${chainId}`
  }

  const filteredActivities = chain === 'all'
    ? activities
    : activities.filter(activity => activity.chain === chain)

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-primary-700">Activity Feed</h3>
        <span className="text-sm text-primary-500">
          {chain === 'all' ? 'All Chains' : `Chain ${chain}`}
        </span>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredActivities.length > 0 ? (
          filteredActivities.map((activity, index) => (
            <motion.div
              key={activity.id}
              className="flex items-center space-x-4 p-3 bg-primary-25 rounded-lg hover:bg-primary-50 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              {/* Icon */}
              <div className={`w-8 h-8 rounded-full ${getChainColor(activity.chain)} flex items-center justify-center text-white`}>
                {activity.icon}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-primary-700 truncate">
                  {activity.description}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs text-primary-500">{activity.timestamp}</span>
                  <span className="text-xs chain-badge">
                    {getChainName(activity.chain)}
                  </span>
                </div>
              </div>

              {/* Points */}
              <div className="text-sm font-semibold text-green-600">
                {activity.points}
              </div>
            </motion.div>
          ))
        ) : (
          <motion.div
            className="text-center py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <p className="text-primary-600 text-sm">No recent activity on this chain</p>
            <p className="text-primary-500 text-xs mt-1">
              Perform transactions to see your activity here
            </p>
          </motion.div>
        )}
      </div>

      {/* View More Button */}
      {filteredActivities.length > 0 && (
        <motion.button
          className="btn-secondary w-full mt-4 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          View Full History
        </motion.button>
      )}
    </motion.div>
  )
}

export default ActivityFeed