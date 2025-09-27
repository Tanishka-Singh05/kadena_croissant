import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useReputation } from '../contexts/ReputationContext'
import DomainTile from './DomainTile'
import { Toast, Confetti, useToast, useConfetti } from './Toast'

const THRESHOLDS = {
  defi: 1000,
  gaming: 800,
  dev: 900
}

const INVITE_CODES = {
  defi: "DEFI-ELITE-1A2B",
  gaming: "GAME-ELITE-3C4D",
  dev: "DEV-ELITE-5E6F"
}

const ExclusivityModal = ({ isOpen, onClose }) => {
  const { reputationScores } = useReputation()
  const { toast, showToast, hideToast } = useToast()
  const { confetti, triggerConfetti, hideConfetti } = useConfetti()
  const [copiedCodes, setCopiedCodes] = useState([])

  // Calculate eligible domains
  const eligibleDomains = [
    { domain: 'defi', score: reputationScores.defiScore, threshold: THRESHOLDS.defi },
    { domain: 'gaming', score: reputationScores.gamingScore, threshold: THRESHOLDS.gaming },
    { domain: 'dev', score: reputationScores.devScore, threshold: THRESHOLDS.dev }
  ].filter(domain => domain.score >= domain.threshold)

  const eligibleCount = eligibleDomains.length

  // Handle copy all codes
  const handleCopyAll = async () => {
    const codesToCopy = eligibleDomains
      .map(domain => INVITE_CODES[domain.domain])
      .join('\n')

    try {
      await navigator.clipboard.writeText(codesToCopy)
      triggerConfetti()
      showToast('Codes copied.', 'success')
    } catch (err) {
      console.error('Failed to copy:', err)
      showToast('Failed to copy codes.', 'error')
    }
  }

  // Handle individual code copy
  const handleCodeCopy = (code) => {
    setCopiedCodes(prev => [...prev, code])
    showToast('Code copied.', 'success')
  }

  // Handle scroll to reputation tips
  const handleViewTips = () => {
    onClose()
    // Scroll to reputation cards section
    setTimeout(() => {
      const reputationSection = document.getElementById('reputation-overview')
      if (reputationSection) {
        reputationSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        })
      } else {
        // Fallback: scroll to top of main content
        const mainElement = document.querySelector('main')
        if (mainElement) {
          mainElement.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          })
        }
      }
    }, 300)
  }

  // Handle ESC key and body scroll management
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      // Prevent body scroll and save current scroll position
      const scrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEsc)
      // Restore body scroll
      const scrollY = document.body.style.top
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1)
      }
    }
  }, [isOpen, onClose])

  return (
    <>
      {isOpen && createPortal(
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[9998]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={onClose}
                style={{ pointerEvents: 'auto' }}
              />

              {/* Modal */}
              <motion.div
                className="fixed inset-0 z-[9999] flex items-center justify-center p-4 overflow-y-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ pointerEvents: 'auto' }}
              >
              <motion.div
                className="relative w-full max-w-6xl max-h-[90vh] bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/30 overflow-hidden my-8 mx-auto"
                initial={{ opacity: 0, scale: 0.92, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 12 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
                style={{ 
                  maxWidth: 'min(90vw, 1200px)',
                  margin: '2rem auto'
                }}
              >
                {/* Close Button */}
                <motion.button
                  className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-primary-600 flex items-center justify-center transition-all duration-200"
                  onClick={onClose}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>

                {/* Header */}
                <div className="px-8 pt-8 pb-6 text-center border-b border-primary-200/50">
                  <motion.h2
                    className="text-3xl font-bold text-primary-700 mb-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    Exclusive Access
                  </motion.h2>
                  <motion.p
                    className="text-lg text-primary-600 mb-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Earn it, prove it, rep it.
                  </motion.p>
                  <motion.p
                    className="text-sm text-primary-500 italic"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    Keep stacking signal—gates open where reputation leads.
                  </motion.p>
                </div>

                {/* Body */}
                <div className="px-8 py-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                  {/* Domain Tiles Grid */}
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <DomainTile
                      domain="defi"
                      score={reputationScores.defiScore}
                      onCopy={handleCodeCopy}
                    />
                    <DomainTile
                      domain="gaming"
                      score={reputationScores.gamingScore}
                      onCopy={handleCodeCopy}
                    />
                    <DomainTile
                      domain="dev"
                      score={reputationScores.devScore}
                      onCopy={handleCodeCopy}
                    />
                  </div>

                  {/* Footer CTAs */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    {eligibleCount > 0 && (
                      <motion.button
                        className="btn-primary flex items-center space-x-2"
                        onClick={handleCopyAll}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <span>Copy All Codes</span>
                      </motion.button>
                    )}
                    
                    <motion.button
                      className="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200 underline"
                      onClick={handleViewTips}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      View reputation tips
                    </motion.button>
                  </div>
                </div>
              </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* Toast */}
      <Toast
        message={toast.message}
        isVisible={toast.isVisible}
        onClose={hideToast}
        type={toast.type}
      />

      {/* Confetti */}
      <Confetti
        isVisible={confetti}
        onComplete={hideConfetti}
      />
    </>
  )
}

export default ExclusivityModal
