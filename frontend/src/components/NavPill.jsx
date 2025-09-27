import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useReputation } from '../contexts/ReputationContext'

const THRESHOLDS = {
  defi: 1000,
  gaming: 800,
  dev: 900
}

const NavPill = ({ onOpenModal }) => {
  const { reputationScores } = useReputation()
  const [eligibleCount, setEligibleCount] = useState(0)
  const [showCelebration, setShowCelebration] = useState(false)
  const [showNewDot, setShowNewDot] = useState(false)
  const [previousEligibleCount, setPreviousEligibleCount] = useState(0)

  // Calculate eligible domains
  useEffect(() => {
    const { defiScore, gamingScore, devScore } = reputationScores
    
    const eligibleDomains = [
      { domain: 'defi', score: defiScore, threshold: THRESHOLDS.defi },
      { domain: 'gaming', score: gamingScore, threshold: THRESHOLDS.gaming },
      { domain: 'dev', score: devScore, threshold: THRESHOLDS.dev }
    ].filter(domain => domain.score >= domain.threshold)

    const newEligibleCount = eligibleDomains.length
    setEligibleCount(newEligibleCount)

    // Check for first-time eligibility celebration
    if (previousEligibleCount === 0 && newEligibleCount >= 1) {
      setShowCelebration(true)
      setShowNewDot(true)
      
      // Hide celebration after animation
      setTimeout(() => setShowCelebration(false), 600)
      
      // Hide "New" dot after 6 seconds
      setTimeout(() => setShowNewDot(false), 6000)
    }

    setPreviousEligibleCount(newEligibleCount)
  }, [reputationScores, previousEligibleCount])

  const isEligible = eligibleCount >= 1

  return (
    <motion.button
      className={`
        relative flex items-center space-x-2 px-4 py-3 rounded-full font-medium text-sm
        transition-all duration-250 ease-out
        ${isEligible 
          ? 'bg-gradient-to-r from-primary-500 to-accent-brown text-white shadow-lg' 
          : 'bg-gradient-to-r from-primary-200 to-primary-300 text-primary-700 border border-primary-300'
        }
      `}
      onClick={onOpenModal}
      whileHover={{ 
        scale: 1.02,
        boxShadow: isEligible 
          ? '0 0 20px rgba(125, 97, 103, 0.4)' 
          : '0 0 15px rgba(125, 97, 103, 0.2)'
      }}
      whileTap={{ 
        scale: 0.98,
        y: 1
      }}
      animate={showCelebration ? {
        scale: [1, 1.1, 1],
        boxShadow: [
          '0 0 20px rgba(125, 97, 103, 0.4)',
          '0 0 30px rgba(125, 97, 103, 0.6)',
          '0 0 20px rgba(125, 97, 103, 0.4)'
        ]
      } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Icon */}
      <div className="flex items-center space-x-1">
        {isEligible ? (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm2.7-2h8.6l1.2-6.4L14 10l-2-3.2L10 10l-3.5-2.4L7.7 14z"/>
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        )}
        
        {/* Attention dot for locked state */}
        {!isEligible && (
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-accent-brown rounded-full animate-pulse" />
        )}
      </div>

      {/* Label */}
      <span>
        {isEligible ? 'Exclusive' : 'Unlock Exclusive'}
      </span>

      {/* Badge */}
      {isEligible && (
        <motion.div
          className="bg-white/20 backdrop-blur-sm rounded-full px-2 py-0.5 text-xs font-bold"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          x{eligibleCount}
        </motion.div>
      )}

      {/* "New" dot for first-time eligibility */}
      {showNewDot && (
        <motion.div
          className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          <span className="text-xs font-bold text-yellow-900">N</span>
        </motion.div>
      )}

      {/* Shimmer effect for celebration */}
      {showCelebration && (
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      )}
    </motion.button>
  )
}

export default NavPill
