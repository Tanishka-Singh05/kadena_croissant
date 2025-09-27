import React from 'react'
import { motion } from 'framer-motion'
import { useActivity } from '../contexts/ActivityContext'

const ActivityFeed = ({ chain }) => {
  const { getActivitiesByChain, getRecentActivities, formatTimestamp, getActivityIcon } = useActivity()

  // Get activities based on chain filter
  const activities = chain === 'all' || !chain
    ? getRecentActivities(10)
    : getActivitiesByChain(chain)

  const getChainColor = (chainId) => {
    const colors = {
      5920: 'bg-primary-500',
      5921: 'bg-accent-brown',
      5922: 'bg-primary-600'
    }
    return colors[chainId] || 'bg-gray-500'
  }

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
        {activities.length > 0 ? (
          activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              className="flex items-center space-x-4 p-3 bg-primary-25 rounded-lg hover:bg-primary-50 transition-colors cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onClick={() => {
                if (activity.txHash) {
                  const explorerUrls = {
                    5920: 'https://chain-20.evm-testnet-blockscout.chainweb.com',
                    5921: 'https://chain-21.evm-testnet-blockscout.chainweb.com',
                    5922: 'https://chain-22.evm-testnet-blockscout.chainweb.com'
                  }
                  const explorerUrl = explorerUrls[activity.chainId]
                  if (explorerUrl) {
                    window.open(`${explorerUrl}/tx/${activity.txHash}`, '_blank')
                  }
                }
              }}
            >
              {/* Icon */}
              <div className={`w-8 h-8 rounded-full ${getChainColor(activity.chainId)} flex items-center justify-center text-white`}>
                {getActivityIcon(activity.type)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-primary-700 truncate">
                  {activity.description}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs text-primary-500">{formatTimestamp(activity.timestamp)}</span>
                  <span className="text-xs chain-badge">
                    {activity.chainName}
                  </span>
                  {activity.txHash && (
                    <span className="text-xs text-blue-600 hover:text-blue-800">
                      {activity.txHash.slice(0, 8)}...
                    </span>
                  )}
                </div>
              </div>

              {/* Points */}
              <div className="text-right">
                <div className="text-sm font-semibold text-green-600">
                  +{activity.points} pts
                </div>
                {activity.value && (
                  <div className="text-xs text-primary-500">
                    {parseFloat(activity.value).toFixed(4)} KDA
                  </div>
                )}
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
            <p className="text-primary-600 text-sm">No recent activity</p>
            <p className="text-primary-500 text-xs mt-1">
              Execute test transactions to see your activity history here
            </p>
          </motion.div>
        )}
      </div>

      {/* View More Button */}
      {activities.length > 0 && (
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