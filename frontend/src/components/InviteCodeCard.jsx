import React, { useState } from 'react'
import { motion } from 'framer-motion'

const INVITE_CODES = {
  defi: "DEFI-ELITE-1A2B",
  gaming: "GAME-ELITE-3C4D",
  dev: "DEV-ELITE-5E6F"
}

const InviteCodeCard = ({ domain, isVisible, onCopy }) => {
  const [isCopied, setIsCopied] = useState(false)
  const inviteCode = INVITE_CODES[domain]

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteCode)
      setIsCopied(true)
      onCopy(inviteCode)
      
      // Reset copied state after 1.2s
      setTimeout(() => setIsCopied(false), 1200)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  if (!isVisible) return null

  return (
    <motion.div
      className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-green-700 mb-1">Invite Code</p>
          <p className="font-mono text-lg font-bold text-green-800">{inviteCode}</p>
          <p className="text-xs text-green-600 mt-1">Welcome in.</p>
        </div>
        
        <motion.button
          className={`
            relative flex items-center justify-center w-10 h-10 rounded-full
            transition-all duration-200 ease-out
            ${isCopied 
              ? 'bg-green-500 text-white' 
              : 'bg-green-100 hover:bg-green-200 text-green-700'
            }
          `}
          onClick={handleCopy}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={isCopied ? {
            scale: [1, 1.1, 1],
            backgroundColor: ['#dcfce7', '#22c55e', '#22c55e']
          } : {}}
          transition={{ duration: 0.2 }}
        >
          {/* Ripple effect */}
          {isCopied && (
            <motion.div
              className="absolute inset-0 rounded-full bg-green-400"
              initial={{ scale: 0, opacity: 0.6 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 0.6 }}
            />
          )}
          
          {/* Icon */}
          <motion.div
            animate={isCopied ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 0.3 }}
          >
            {isCopied ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            )}
          </motion.div>
        </motion.button>
      </div>
    </motion.div>
  )
}

export default InviteCodeCard
