"use client"

import { useMemo } from 'react'
import { useChat } from 'ai/react'
import { motion } from 'framer-motion'
import { Radar, Database, Gauge, SlidersHorizontal, AlertTriangle } from 'lucide-react'
import ChatInterface from './ChatInterface'

type TransactionSummary = {
  chainId: number
  chainLabel: string
  totalTxs: number
  avgGas: number
  successRate: number
  dominantActivity: string
}

const SAMPLE_SUMMARY: TransactionSummary[] = [
  {
    chainId: 5920,
    chainLabel: 'DeFi Chain (20)',
    totalTxs: 148,
    avgGas: 0.0007,
    successRate: 0.97,
    dominantActivity: 'Liquidity Provision'
  },
  {
    chainId: 5921,
    chainLabel: 'Gaming Chain (21)',
    totalTxs: 62,
    avgGas: 0.0003,
    successRate: 0.92,
    dominantActivity: 'NFT Trading'
  },
  {
    chainId: 5922,
    chainLabel: 'Dev Chain (22)',
    totalTxs: 41,
    avgGas: 0.0009,
    successRate: 0.88,
    dominantActivity: 'Contract Deployment'
  }
]

export default function TransactionAnalysisAgent() {
  const chat = useChat({
    api: '/api/chat/transaction-analysis',
    body: { summary: SAMPLE_SUMMARY },
    initialMessages: [
      {
        id: 'intro',
        role: 'assistant',
        content: `Hello! I'm your Transaction Analysis Agent. I monitor your activity across Kadena's multi-chain ecosystem and surface transaction patterns, gas optimization opportunities, and risk signals.

Here's a snapshot of your recent on-chain activity:
• Chain 20 (DeFi): ${SAMPLE_SUMMARY[0].totalTxs} txs • Avg Gas ${SAMPLE_SUMMARY[0].avgGas} KDA • ${Math.round(SAMPLE_SUMMARY[0].successRate * 100)}% success
• Chain 21 (Gaming): ${SAMPLE_SUMMARY[1].totalTxs} txs • Avg Gas ${SAMPLE_SUMMARY[1].avgGas} KDA • ${Math.round(SAMPLE_SUMMARY[1].successRate * 100)}% success
• Chain 22 (Dev): ${SAMPLE_SUMMARY[2].totalTxs} txs • Avg Gas ${SAMPLE_SUMMARY[2].avgGas} KDA • ${Math.round(SAMPLE_SUMMARY[2].successRate * 100)}% success

Ask me about gas optimization, failed transaction diagnostics, MEV protection, batching opportunities, or cross-chain timing strategies.`
      }
    ]
  })

  const quickActions = useMemo(
    () => [
      {
        label: 'Gas Optimization',
        prompt: 'Review my gas usage across all chains and suggest concrete optimization steps.'
      },
      {
        label: 'Failed Tx Diagnostics',
        prompt: 'Identify the root causes behind my failed or reverted transactions and how to prevent them.'
      },
      {
        label: 'Batching Opportunities',
        prompt: 'Where can I batch or reorder transactions to reduce fees without hurting reputation gains?'
      }
    ],
    []
  )

  return (
    <motion.div
      className="max-w-6xl mx-auto"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="card mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-primary-500 flex items-center justify-center">
            <Radar className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-primary-700">Transaction Analysis Agent</h1>
            <p className="text-primary-600">Real-time monitoring of multi-chain transaction health, cost, and impact.</p>
          </div>
          <span className="agent-badge bg-green-100 text-green-700 border-green-200">● Monitoring</span>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {SAMPLE_SUMMARY.map(item => (
            <div key={item.chainId} className="bg-white/70 border border-primary-200/60 rounded-xl p-4 shadow-soft">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-primary-700">{item.chainLabel}</h3>
                <Gauge className="w-4 h-4 text-primary-500" />
              </div>
              <div className="text-2xl font-bold text-primary-700">{item.totalTxs}</div>
              <p className="text-xs text-primary-500 mb-3">transactions in last 7 days</p>
              <div className="space-y-2 text-xs text-primary-600">
                <p className="flex items-center justify-between">
                  <span>Avg Gas</span>
                  <span>{item.avgGas} KDA</span>
                </p>
                <p className="flex items-center justify-between">
                  <span>Success Rate</span>
                  <span>{Math.round(item.successRate * 100)}%</span>
                </p>
                <p className="flex items-center justify-between">
                  <span>Top Activity</span>
                  <span>{item.dominantActivity}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ChatInterface
            chat={chat}
            placeholder="Ask about gas usage, failed transactions, MEV risk, batching strategies, or cross-chain timing..."
            quickActions={quickActions}
          />
        </div>

        <div className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-semibold text-primary-700 mb-4">Live Monitors</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <Database className="w-4 h-4 text-primary-500 mt-1" />
                <div>
                  <p className="font-medium text-primary-700">Throughput Heatmap</p>
                  <p className="text-primary-600">Highlights unusual transaction bursts or lulls across chains.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <SlidersHorizontal className="w-4 h-4 text-primary-500 mt-1" />
                <div>
                  <p className="font-medium text-primary-700">Gas Efficiency Tracker</p>
                  <p className="text-primary-600">Benchmarks your gas spend versus reputation impact.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-4 h-4 text-primary-500 mt-1" />
                <div>
                  <p className="font-medium text-primary-700">Risk Alerts</p>
                  <p className="text-primary-600">Flags repeated failures, timeouts, or MEV-prone patterns.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
