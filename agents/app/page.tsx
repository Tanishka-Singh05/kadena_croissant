'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Brain, Target, LineChart, MessageCircle, TrendingUp, Shield } from 'lucide-react'
import TransactionAnalysisAgent from './components/TransactionAnalysisAgent'
import GoalTrackingAgent from './components/GoalTrackingAgent'
import ReputationEnhancementAgent from './components/ReputationEnhancementAgent'

export default function Home() {
  const [activeAgent, setActiveAgent] = useState<string | null>(null)

  const agents = [
    {
      id: 'transaction-analysis',
      name: 'Transaction Analysis Agent',
      description: 'Inspects your Kadena Chainweb transactions, gas usage, and risk signals in real time',
      icon: LineChart,
      color: 'primary',
      component: TransactionAnalysisAgent
    },
    {
      id: 'goal-tracking',
      name: 'Goal Achievement Agent',
      description: 'Tracks your reputation milestones and delivers step-by-step guidance to hit your targets',
      icon: Target,
      color: 'accent',
      component: GoalTrackingAgent
    },
    {
      id: 'reputation-enhancement',
      name: 'Reputation Enhancement Agent',
      description: 'Designs personalized action plans to elevate your cross-domain reputation scores',
      icon: Brain,
      color: 'secondary',
      component: ReputationEnhancementAgent
    }
  ]

  const ActiveAgentComponent = activeAgent 
    ? agents.find(agent => agent.id === activeAgent)?.component 
    : null

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-primary-200/30 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gradient">Chainweb AI Agents</h1>
              <p className="text-primary-600 mt-1">Intelligent assistants for your reputation journey</p>
            </div>
            <div className="flex items-center space-x-2">
              <MessageCircle className="w-5 h-5 text-primary-500" />
              <span className="text-sm text-primary-600">3 Agents Active</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {!activeAgent ? (
          <>
            {/* Hero Section */}
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-primary-700 mb-4">
                AI-Powered Reputation Intelligence
              </h2>
              <p className="text-xl text-primary-600 max-w-3xl mx-auto leading-relaxed">
                Leverage advanced AI agents to analyze, optimize, and strategize your cross-chain reputation 
                across Kadena's multi-domain ecosystem.
              </p>
            </motion.div>

            {/* Agents Grid */}
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {agents.map((agent, index) => {
                const IconComponent = agent.icon
                return (
                  <motion.div
                    key={agent.id}
                    className="card cursor-pointer hover:scale-105 transition-transform duration-300"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    onClick={() => setActiveAgent(agent.id)}
                  >
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                      agent.color === 'primary' ? 'bg-primary-500' :
                      agent.color === 'accent' ? 'bg-accent-brown' :
                      'bg-primary-600'
                    }`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-semibold text-primary-700 mb-3 text-center">
                      {agent.name}
                    </h3>
                    
                    <p className="text-primary-600 text-center leading-relaxed mb-4">
                      {agent.description}
                    </p>
                    
                    <div className="flex justify-center">
                      <span className={`agent-badge ${
                        agent.color === 'primary' ? 'bg-primary-100 text-primary-700 border-primary-200' :
                        agent.color === 'accent' ? 'bg-orange-100 text-orange-700 border-orange-200' :
                        'bg-purple-100 text-purple-700 border-purple-200'
                      }`}>
                        Launch Agent
                      </span>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Features Section */}
            <motion.div
              className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-primary-700 mb-2">Smart Analysis</h4>
                <p className="text-sm text-primary-600">AI-powered insights into your reputation patterns</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-accent-brown rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-primary-700 mb-2">Strategy Optimization</h4>
                <p className="text-sm text-primary-600">Personalized recommendations for reputation growth</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-primary-700 mb-2">Privacy First</h4>
                <p className="text-sm text-primary-600">Zero-knowledge proof guidance and optimization</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-primary-700 mb-2">Interactive Chat</h4>
                <p className="text-sm text-primary-600">Natural conversation with specialized AI agents</p>
              </div>
            </motion.div>
          </>
        ) : (
          <div>
            {/* Back Button */}
            <motion.button
              onClick={() => setActiveAgent(null)}
              className="btn-secondary mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              ← Back to Agents
            </motion.button>
            
            {/* Active Agent */}
            {ActiveAgentComponent && <ActiveAgentComponent />}
          </div>
        )}
      </main>
    </div>
  )
}
