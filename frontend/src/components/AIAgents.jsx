import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, Target, LineChart, MessageCircle, TrendingUp, Shield, X } from 'lucide-react'

const AIAgents = () => {
  const [activeAgent, setActiveAgent] = useState(null)
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const agents = [
    {
      id: 'transaction-analysis',
      name: 'Transaction Analysis Agent',
      description: 'Inspects your Kadena Chainweb transactions, gas usage, and risk signals in real time',
      icon: LineChart,
      color: 'primary',
      gradient: 'from-primary-500 to-primary-600'
    },
    {
      id: 'goal-tracking',
      name: 'Goal Achievement Agent',
      description: 'Tracks your reputation milestones and delivers step-by-step guidance to hit your targets',
      icon: Target,
      color: 'accent',
      gradient: 'from-accent-brown to-accent-orange'
    },
    {
      id: 'reputation-enhancement',
      name: 'Reputation Enhancement Agent',
      description: 'Designs personalized action plans to elevate your cross-domain reputation scores',
      icon: Brain,
      color: 'secondary',
      gradient: 'from-primary-600 to-primary-700'
    }
  ]

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !activeAgent) return

    const newMessage = { role: 'user', content: inputMessage }
    setMessages(prev => [...prev, newMessage])
    setInputMessage('')
    setIsLoading(true)

    try {
      // Simulate API call to agent
      await new Promise(resolve => setTimeout(resolve, 1500))

      const agentResponse = {
        role: 'assistant',
        content: `This is a simulated response from the ${activeAgent.name}. In a real implementation, this would connect to the AI agent API endpoints to provide intelligent analysis and recommendations based on your Kadena Chainweb activity.`
      }

      setMessages(prev => [...prev, agentResponse])
    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const AgentCard = ({ agent }) => (
    <motion.div
      className="relative overflow-hidden rounded-xl cursor-pointer group"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => {
        setActiveAgent(agent)
        setMessages([{
          role: 'assistant',
          content: `Hello! I'm the ${agent.name}. How can I help you optimize your Kadena Chainweb reputation today?`
        }])
      }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${agent.gradient} opacity-90`} />
      <div className="relative p-6 text-white">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4">
            <agent.icon className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{agent.name}</h3>
          </div>
        </div>
        <p className="text-white/90 text-sm leading-relaxed">
          {agent.description}
        </p>
      </div>
    </motion.div>
  )

  const ChatInterface = ({ agent }) => (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-start justify-center pt-16 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setActiveAgent(null)
        }
      }}
    >
      <motion.div
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl h-[500px] flex flex-col"
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 50 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`bg-gradient-to-r ${agent.gradient} p-4 rounded-t-xl flex items-center justify-between text-white`}>
          <div className="flex items-center">
            <agent.icon className="w-6 h-6 mr-3" />
            <h2 className="text-lg font-semibold">{agent.name}</h2>
          </div>
          <button
            onClick={() => setActiveAgent(null)}
            className="p-1 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 p-3 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t p-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask about your reputation, transactions, or goals..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-primary-700">AI Agents</h2>
        <div className="flex items-center space-x-2 text-sm text-primary-600">
          <Brain className="w-4 h-4" />
          <span>Powered by AI</span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-6">
        {agents.map((agent) => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6 pt-6 border-t border-primary-100">
        <div className="text-center">
          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <LineChart className="w-6 h-6 text-primary-600" />
          </div>
          <h4 className="font-semibold text-primary-700 mb-2">Smart Analysis</h4>
          <p className="text-sm text-primary-600">AI-powered insights into your reputation patterns</p>
        </div>

        <div className="text-center">
          <div className="w-12 h-12 bg-accent-brown/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <TrendingUp className="w-6 h-6 text-accent-brown" />
          </div>
          <h4 className="font-semibold text-primary-700 mb-2">Strategy Optimization</h4>
          <p className="text-sm text-primary-600">Personalized recommendations for reputation growth</p>
        </div>

        <div className="text-center">
          <div className="w-12 h-12 bg-primary-200 rounded-full flex items-center justify-center mx-auto mb-3">
            <Shield className="w-6 h-6 text-primary-700" />
          </div>
          <h4 className="font-semibold text-primary-700 mb-2">Risk Assessment</h4>
          <p className="text-sm text-primary-600">Proactive monitoring of reputation risks</p>
        </div>
      </div>

      <AnimatePresence>
        {activeAgent && <ChatInterface agent={activeAgent} />}
      </AnimatePresence>
    </motion.div>
  )
}

export default AIAgents