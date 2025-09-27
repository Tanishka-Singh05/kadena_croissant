import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useWallet } from '../contexts/WalletContext'
import { useReputation } from '../contexts/ReputationContext'
import ReputationCard from './ReputationCard'
import ActivityFeed from './ActivityFeed'
import ChainSelector from './ChainSelector'
import TestTransaction from './TestTransaction'

const Dashboard = () => {
  const { account, chainId, isKadenaChain } = useWallet()
  const { reputationScores, getUserLevel, getLevelProgress } = useReputation()
  const [selectedChain, setSelectedChain] = useState(5920)
  const [isLoading, setIsLoading] = useState(false)

  // Set loading state when account changes
  useEffect(() => {
    if (account) {
      setIsLoading(true)
      // Brief loading state for UX
      setTimeout(() => setIsLoading(false), 800)
    }
  }, [account])

  if (!account) {
    return (
      <motion.div
        className="text-center py-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="card-glass max-w-md mx-auto">
          <div className="w-20 h-20 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-primary-700 mb-4">Connect Your Wallet</h3>
          <p className="text-primary-600 mb-6">
            Connect your wallet to view your reputation across Kadena's multi-chain ecosystem
          </p>
          <div className="space-y-2 text-left">
            <div className="flex items-center space-x-2 text-sm text-primary-600">
              <div className="w-2 h-2 bg-primary-400 rounded-full" />
              <span>Track DeFi reputation on Chain 20</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-primary-600">
              <div className="w-2 h-2 bg-accent-brown rounded-full" />
              <span>Monitor Gaming achievements on Chain 21</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-primary-600">
              <div className="w-2 h-2 bg-primary-600 rounded-full" />
              <span>Evaluate Development contributions on Chain 22</span>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  if (!isKadenaChain(chainId)) {
    return (
      <motion.div
        className="text-center py-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="card max-w-md mx-auto border-red-200 bg-red-50">
          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-red-700 mb-2">Wrong Network</h3>
          <p className="text-red-600">
            Please switch to a Kadena EVM chain (20-22) to view your reputation.
          </p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Chain Selector */}
      <ChainSelector
        selectedChain={selectedChain}
        onChainSelect={setSelectedChain}
        currentChain={chainId}
      />

      {/* Reputation Overview */}
      <div className="grid lg:grid-cols-4 gap-6">
        <ReputationCard
          title="DeFi Reputation"
          score={reputationScores.defiScore}
          chain={5920}
          color="primary"
          isLoading={isLoading}
        />
        <ReputationCard
          title="Gaming Reputation"
          score={reputationScores.gamingScore}
          chain={5921}
          color="accent"
          isLoading={isLoading}
        />
        <ReputationCard
          title="Dev Reputation"
          score={reputationScores.devScore}
          chain={5922}
          color="secondary"
          isLoading={isLoading}
        />
        <ReputationCard
          title="Total Score"
          score={reputationScores.totalScore}
          chain="all"
          color="gradient"
          isLoading={isLoading}
          isTotal={true}
          userLevel={getUserLevel()}
          levelProgress={getLevelProgress()}
        />
      </div>

      {/* Test Transaction Component */}
      <TestTransaction selectedChain={selectedChain} />

      {/* Activity Feed */}
      <div className="grid lg:grid-cols-2 gap-8">
        <ActivityFeed chain={selectedChain} />

        {/* ZK Proof Status */}
        <motion.div
          className="card"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-xl font-semibold text-primary-700 mb-4">ZK Proof Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-primary-50 rounded-lg">
              <span className="text-primary-700">Cross-Chain Aggregation</span>
              <span className="chain-badge bg-green-100 text-green-700 border-green-200">
                Ready
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-primary-50 rounded-lg">
              <span className="text-primary-700">Privacy Proof Generation</span>
              <span className="chain-badge bg-blue-100 text-blue-700 border-blue-200">
                Available
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-primary-50 rounded-lg">
              <span className="text-primary-700">Hedera Anchoring</span>
              <span className="chain-badge bg-yellow-100 text-yellow-700 border-yellow-200">
                Pending
              </span>
            </div>
            <motion.button
              className="btn-primary w-full mt-4"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Generate ZK Proof
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Dashboard