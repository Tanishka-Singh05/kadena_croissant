import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useWallet } from '../contexts/WalletContext'
import { useActivity } from '../contexts/ActivityContext'
import { ethers } from 'ethers'

const TestTransaction = ({ selectedChain }) => {
  const { account, provider, chainId, switchChain } = useWallet()
  const { addActivity, calculateReputationPoints, getChainName } = useActivity()
  const [isLoading, setIsLoading] = useState(false)
  const [txHash, setTxHash] = useState(null)
  const [error, setError] = useState(null)
  const [showDetails, setShowDetails] = useState(false)
  const [earnedPoints, setEarnedPoints] = useState(0)

  const getChainDescription = (chain) => {
    const descriptions = {
      5920: {
        name: 'DeFi Chain',
        activity: 'Execute a swap transaction',
        description: 'This will simulate a DeFi transaction and update your reputation score',
        color: 'primary'
      },
      5921: {
        name: 'Gaming Chain',
        activity: 'Claim achievement NFT',
        description: 'This will simulate a gaming achievement and update your reputation score',
        color: 'accent'
      },
      5922: {
        name: 'Development Chain',
        activity: 'Deploy test contract',
        description: 'This will simulate a contract deployment and update your reputation score',
        color: 'secondary'
      }
    }
    return descriptions[chain] || descriptions[5920]
  }

  const executeTestTransaction = async () => {
    if (!account || !provider) {
      setError('Please connect your wallet first')
      return
    }

    if (chainId !== selectedChain) {
      setError(`Please switch to Chain ${selectedChain} first`)
      return
    }

    setIsLoading(true)
    setError(null)
    setTxHash(null)

    try {
      // Wait for provider to update after chain switch
      await new Promise(resolve => setTimeout(resolve, 500))
      const signer = await provider.getSigner()

      // Check balance before sending
      const balance = await provider.getBalance(account)
      let requiredValue
      if (selectedChain === 5920) {
        requiredValue = ethers.parseEther('0.001')
      } else if (selectedChain === 5921) {
        requiredValue = ethers.parseEther('0.0005')
      } else if (selectedChain === 5922) {
        requiredValue = ethers.parseEther('0.0001')
      } else {
        requiredValue = ethers.parseEther('0.001')
      }
      if (balance < requiredValue) {
        setError('Insufficient balance for test transaction')
        setIsLoading(false)
        return
      }

      // Use the user's own address for test transactions
      const testAddress = account
      let tx

      tx = await signer.sendTransaction({
        to: testAddress,
        value: requiredValue,
      })

      setTxHash(tx.hash)

      // Wait for confirmation
      const receipt = await tx.wait()

      // Calculate reputation points and record activity
      const points = calculateReputationPoints(selectedChain, tx.hash)
      setEarnedPoints(points)

      const activityType = selectedChain === 5920 ? 'defi' :
                          selectedChain === 5921 ? 'gaming' : 'development'

      addActivity({
        type: activityType,
        description: getChainDescription(selectedChain).activity,
        points: points,
        txHash: tx.hash,
        chainId: selectedChain,
        chainName: getChainName(selectedChain),
        value: ethers.formatEther(tx.value),
        blockNumber: receipt.blockNumber,
        gasUsed: receipt.gasUsed.toString(),
        status: 'confirmed'
      })

      await new Promise(resolve => setTimeout(resolve, 1000))

      setShowDetails(true)

    } catch (err) {
      // Log full error object for debugging
      console.error('Transaction failed:', err)
      if (typeof err === 'object') {
        setError(JSON.stringify(err, Object.getOwnPropertyNames(err)))
      } else {
        setError(String(err))
      }
    } finally {
      setIsLoading(false)
    }
  }

  const chainDesc = getChainDescription(selectedChain)

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-primary-700">Test Transaction</h3>
        <span className={`chain-badge ${
          selectedChain === 5920 ? 'bg-primary-100 text-primary-700' :
          selectedChain === 5921 ? 'bg-orange-100 text-orange-700' :
          'bg-purple-100 text-purple-700'
        }`}>
          {chainDesc.name}
        </span>
      </div>

      {/* Transaction Description */}
      <div className="bg-primary-50 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-primary-700 mb-2">{chainDesc.activity}</h4>
        <p className="text-sm text-primary-600">{chainDesc.description}</p>
      </div>

      {/* Current Chain Check */}
      {chainId !== selectedChain && account && (
        <motion.div
          className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <div>
              <p className="text-sm font-medium text-yellow-800">Wrong Network</p>
              <p className="text-xs text-yellow-700">
                You're on Chain {chainId}. Switch to Chain {selectedChain} to test.
              </p>
            </div>
          </div>
          <motion.button
            onClick={() => switchChain(selectedChain)}
            className="btn-secondary text-xs mt-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Switch to Chain {selectedChain}
          </motion.button>
        </motion.div>
      )}

      {/* Transaction Button */}
      <motion.button
        onClick={executeTestTransaction}
        disabled={!account || isLoading || chainId !== selectedChain}
        className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
        whileHover={{ scale: account && chainId === selectedChain && !isLoading ? 1.02 : 1 }}
        whileTap={{ scale: account && chainId === selectedChain && !isLoading ? 0.98 : 1 }}
      >
        {isLoading ? (
          <div className="flex items-center justify-center space-x-2">
            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>Processing Transaction...</span>
          </div>
        ) : !account ? (
          'Connect Wallet First'
        ) : chainId !== selectedChain ? (
          `Switch to Chain ${selectedChain}`
        ) : (
          `Execute ${chainDesc.activity}`
        )}
      </motion.button>

      {/* Error Display */}
      <AnimatePresence>
        {error && (
          <motion.div
            className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm text-red-700">{error}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Display */}
      <AnimatePresence>
        {txHash && (
          <motion.div
            className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="flex items-center space-x-2 mb-2">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium text-green-800">Transaction Successful!</span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-xs text-green-700">Transaction Hash:</span>
                <code className="text-xs font-mono bg-green-100 px-2 py-1 rounded">
                  {txHash.slice(0, 8)}...{txHash.slice(-6)}
                </code>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-xs text-green-700">Reputation Update:</span>
                <span className="text-xs font-semibold text-green-800">+{earnedPoints} points</span>
              </div>
            </div>

            {/* View on Explorer */}
            <motion.a
              href={`https://chain-${selectedChain === 5920 ? '20' : selectedChain === 5921 ? '21' : '22'}.evm-testnet-blockscout.chainweb.com/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 text-xs text-green-700 hover:text-green-800 mt-2"
              whileHover={{ scale: 1.02 }}
            >
              <span>View on Explorer</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Transaction Info */}
      <div className="mt-4 text-xs text-primary-500 space-y-1">
        <p>• This creates a real transaction on the Kadena testnet</p>
        <p>• Your reputation score will be updated based on the activity</p>
        <p>• Gas fees are minimal on Kadena (~$0.007 per transaction)</p>
      </div>
    </motion.div>
  )
}

export default TestTransaction