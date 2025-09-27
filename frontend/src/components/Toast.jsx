import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Toast Component
export const Toast = ({ message, isVisible, onClose, type = 'success' }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose()
      }, 2400) // Auto-dismiss after 2.4s
      
      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose])

  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500 text-white'
      case 'error':
        return 'bg-red-500 text-white'
      case 'info':
        return 'bg-blue-500 text-white'
      default:
        return 'bg-primary-500 text-white'
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`
            fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg
            ${getToastStyles()}
          `}
          initial={{ opacity: 0, x: 100, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 100, scale: 0.9 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <div className="flex items-center space-x-2">
            {type === 'success' && (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
            )}
            <span className="font-medium">{message}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Confetti Component
export const Confetti = ({ isVisible, onComplete }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onComplete()
      }, 2000) // Confetti duration
      
      return () => clearTimeout(timer)
    }
  }, [isVisible, onComplete])

  const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: -10,
    rotation: Math.random() * 360,
    color: ['#7D6167', '#754F5B', '#5D4954', '#F9E0D9', '#E6DBD0'][Math.floor(Math.random() * 5)],
    delay: Math.random() * 0.5
  }))

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {confettiPieces.map((piece) => (
            <motion.div
              key={piece.id}
              className="absolute w-2 h-2 rounded-full"
              style={{
                backgroundColor: piece.color,
                left: `${piece.x}%`,
                top: `${piece.y}%`
              }}
              initial={{ 
                y: 0, 
                rotate: 0,
                opacity: 1 
              }}
              animate={{ 
                y: window.innerHeight + 100,
                rotate: piece.rotation + 720,
                opacity: 0
              }}
              transition={{
                duration: 2,
                delay: piece.delay,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  )
}

// Toast Provider Hook
export const useToast = () => {
  const [toast, setToast] = useState({
    message: '',
    isVisible: false,
    type: 'success'
  })

  const showToast = (message, type = 'success') => {
    setToast({
      message,
      isVisible: true,
      type
    })
  }

  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }))
  }

  return {
    toast,
    showToast,
    hideToast
  }
}

// Confetti Provider Hook
export const useConfetti = () => {
  const [confetti, setConfetti] = useState(false)

  const triggerConfetti = () => {
    setConfetti(true)
  }

  const hideConfetti = () => {
    setConfetti(false)
  }

  return {
    confetti,
    triggerConfetti,
    hideConfetti
  }
}
