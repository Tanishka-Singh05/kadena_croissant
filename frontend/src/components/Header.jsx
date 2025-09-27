import React, { useState } from 'react'
import { motion } from 'framer-motion'
import WalletConnect from './WalletConnect'
import NavPill from './NavPill'
import ExclusivityModal from './ExclusivityModal'
import { useWallet } from '../contexts/WalletContext'

const Header = () => {
  const { account, chainId, getChainName, isKadenaChain } = useWallet()
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <motion.header
      className="border-b border-primary-200/50 bg-white/70 backdrop-blur-md sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-brown rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary-700">Chainweb ZKRep</h1>
              <p className="text-sm text-primary-500">Multi-Chain Reputation</p>
            </div>
          </motion.div>

          {/* Navigation & Status */}
          <div className="flex items-center space-x-4">
            {/* Chain Status */}
            {account && chainId && (
              <motion.div
                className={`chain-badge ${
                  isKadenaChain(chainId)
                    ? 'bg-green-100 text-green-700 border-green-200'
                    : 'bg-red-100 text-red-700 border-red-200'
                }`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                <div className={`w-2 h-2 rounded-full mr-2 ${
                  isKadenaChain(chainId) ? 'bg-green-500' : 'bg-red-500'
                }`} />
                {getChainName(chainId)}
              </motion.div>
            )}

            {/* Exclusivity Status Pill */}
            {account && isKadenaChain(chainId) && (
              <NavPill onOpenModal={() => setIsModalOpen(true)} />
            )}

            {/* Wallet Connect */}
            <WalletConnect />
          </div>
        </div>
      </div>
      
      {/* Exclusivity Modal */}
      <ExclusivityModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </motion.header>
  )
}

export default Header