import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import WalletConnect from './components/WalletConnect'
import { WalletProvider } from './contexts/WalletContext'

function App() {
  const [isConnected, setIsConnected] = useState(false)

  return (
    <WalletProvider>
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-light to-primary-100">
        <Header />

        <main className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            {/* Hero Section */}
            <div className="text-center mb-12">
              <motion.h1
                className="text-5xl md:text-7xl font-bold mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <span className="text-gradient">Chainweb</span>
                <br />
                <span className="text-primary-700">ZK Reputation</span>
              </motion.h1>

              <motion.p
                className="text-xl text-primary-600 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
              >
                The world's first privacy-preserving, multi-chain reputation system
                built on Kadena's Chainweb. Prove your cross-domain expertise without
                revealing your transaction history.
              </motion.p>
            </div>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Dashboard />
            </motion.div>

            {/* Features Section */}
            <motion.div
              className="mt-16 grid md:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <div className="card text-center">
                <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-primary-700 mb-2">Privacy-First</h3>
                <p className="text-primary-600">ZK proofs ensure your reputation is verifiable without revealing sensitive transaction details.</p>
              </div>

              <div className="card text-center">
                <div className="w-16 h-16 bg-accent-brown rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-primary-700 mb-2">Multi-Chain</h3>
                <p className="text-primary-600">Aggregate reputation across DeFi, Gaming, and Development domains on Kadena's parallel chains.</p>
              </div>

              <div className="card text-center">
                <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-primary-700 mb-2">Real-Time</h3>
                <p className="text-primary-600">Continuously updated reputation scores based on your on-chain activity and contributions.</p>
              </div>
            </motion.div>
          </motion.div>
        </main>
      </div>
    </WalletProvider>
  )
}

export default App