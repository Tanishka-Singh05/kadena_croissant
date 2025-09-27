import React from 'react'
import { motion } from 'framer-motion'
import { useWallet } from '../contexts/WalletContext'

const ChainSelector = ({ selectedChain, onChainSelect, currentChain }) => {
  const { switchChain } = useWallet()

  const chains = [
    {
      id: 20,
      name: 'DeFi Chain',
      description: 'Trading, Liquidity, Lending',
      color: 'from-primary-500 to-primary-600',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      )
    },
    {
      id: 21,
      name: 'Gaming Chain',
      description: 'NFTs, Achievements, Gaming',
      color: 'from-accent-brown to-accent-dark',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      )
    },
    {
      id: 22,
      name: 'Dev Chain',
      description: 'Contracts, Development, Code',
      color: 'from-primary-600 to-primary-700',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    }
  ]

  const handleChainSelect = async (chainId) => {
    onChainSelect(chainId)
    if (currentChain !== chainId) {
      await switchChain(chainId)
    }
  }

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="text-xl font-semibold text-primary-700 mb-6">Select Chain to Explore</h3>

      <div className="grid md:grid-cols-3 gap-4">
        {chains.map((chain, index) => (
          <motion.button
            key={chain.id}
            onClick={() => handleChainSelect(chain.id)}
            className={`relative p-4 rounded-xl border-2 transition-all duration-300 text-left ${
              selectedChain === chain.id
                ? 'border-primary-500 bg-primary-50'
                : 'border-primary-200 bg-white hover:border-primary-300 hover:bg-primary-25'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Active Indicator */}
            {selectedChain === chain.id && (
              <motion.div
                className="absolute top-2 right-2 w-3 h-3 bg-primary-500 rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}

            {/* Current Chain Indicator */}
            {currentChain === chain.id && (
              <motion.div
                className="absolute top-2 left-2 w-2 h-2 bg-green-500 rounded-full animate-pulse-soft"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}

            {/* Icon */}
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${chain.color} flex items-center justify-center text-white mb-3`}>
              {chain.icon}
            </div>

            {/* Content */}
            <div>
              <h4 className="font-semibold text-primary-700 mb-1">{chain.name}</h4>
              <p className="text-sm text-primary-600">{chain.description}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-primary-500">Chain {chain.id}</span>
                {currentChain === chain.id && (
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    Connected
                  </span>
                )}
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Info */}
      <motion.div
        className="mt-6 p-4 bg-primary-50 rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-start space-x-3">
          <div className="w-5 h-5 text-primary-500 mt-0.5">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-primary-700 font-medium mb-1">Multi-Chain Reputation</p>
            <p className="text-xs text-primary-600">
              Your reputation is calculated independently on each chain based on your activity patterns.
              Switch between chains to see domain-specific metrics and perform test transactions.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ChainSelector