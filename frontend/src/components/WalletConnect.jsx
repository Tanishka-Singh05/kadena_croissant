import React from 'react'
import { motion } from 'framer-motion'
import { useWallet } from '../contexts/WalletContext'

const WalletConnect = () => {
  const {
    account,
    isConnecting,
    error,
    connectWallet,
    disconnectWallet,
    chainId,
    isKadenaChain,
    switchChain
  } = useWallet()

  const formatAddress = (address) => {
    if (!address) return ''
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  if (account) {
    return (
      <div className="flex items-center space-x-3">
        {/* Chain Switcher */}
        <div className="flex space-x-1">
          {[20, 21, 22].map((chain) => (
            <motion.button
              key={chain}
              onClick={() => switchChain(chain)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                chainId === chain
                  ? 'bg-primary-500 text-white'
                  : 'bg-primary-100 text-primary-600 hover:bg-primary-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {chain}
            </motion.button>
          ))}
        </div>

        {/* Account Info */}
        <motion.div
          className="flex items-center space-x-2 bg-white/80 rounded-lg px-3 py-2 border border-primary-200"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-soft" />
          <span className="text-sm font-mono text-primary-700">
            {formatAddress(account)}
          </span>
        </motion.div>

        {/* Disconnect Button */}
        <motion.button
          onClick={disconnectWallet}
          className="btn-secondary text-sm py-2 px-4"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Disconnect
        </motion.button>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-end space-y-2">
      <motion.button
        onClick={connectWallet}
        disabled={isConnecting}
        className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        whileHover={{ scale: isConnecting ? 1 : 1.05 }}
        whileTap={{ scale: isConnecting ? 1 : 0.95 }}
      >
        {isConnecting ? (
          <div className="flex items-center space-x-2">
            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>Connecting...</span>
          </div>
        ) : (
          'Connect Wallet'
        )}
      </motion.button>

      {error && (
        <motion.div
          className="text-sm text-red-600 bg-red-50 px-3 py-1 rounded border border-red-200"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {error}
        </motion.div>
      )}

      {!account && (
        <motion.p
          className="text-xs text-primary-500 max-w-xs text-right"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Connect your wallet to view your cross-chain reputation
        </motion.p>
      )}
    </div>
  )
}

export default WalletConnect