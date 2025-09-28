"use client"

import { useMemo } from 'react'
import { useChat } from 'ai/react'
import { motion } from 'framer-motion'
import { Sparkles, Rocket, ShieldCheck, Workflow } from 'lucide-react'
import ChatInterface from './ChatInterface'

type ReputationSnapshot = {
  chainId: number
  chainLabel: string
  score: number
  weight: number
  opportunities: string[]
}

const SNAPSHOT: ReputationSnapshot[] = [
  {
    chainId: 5920,
    chainLabel: 'DeFi Reputation',
    score: 1260,
    weight: 0.4,
    opportunities: ['Optimize LP positions for higher utilization', 'Automate daily lending loops']
  },
  {
    chainId: 5921,
    chainLabel: 'Gaming Reputation',
    score: 720,
    weight: 0.3,
    opportunities: ['Join elite tournament bracket', 'Flip rare NFT drops at peak hours']
  },
  {
    chainId: 5922,
    chainLabel: 'Development Reputation',
    score: 980,
    weight: 0.3,
    opportunities: ['Publish audited contract templates', 'Contribute to Kadena Dev Grants']
  }
]

export default function ReputationEnhancementAgent() {
  const chat = useChat({
    api: '/api/chat/reputation-enhancement',
    body: { snapshot: SNAPSHOT },
    initialMessages: [
      {
        id: 'intro',
        role: 'assistant',
        content: `Welcome! I'm your Reputation Enhancement Agent. I craft proactive playbooks to raise your Kadena Chainweb reputation across DeFi, Gaming, and Development domains.

Current baseline:
• DeFi: ${SNAPSHOT[0].score} pts (40% weight) — Advanced LP strategist, room for automated loops
• Gaming: ${SNAPSHOT[1].score} pts (30% weight) — Rising champion, needs elite tournament placements
• Development: ${SNAPSHOT[2].score} pts (30% weight) — Near expert tier, grant contributions pending

Ask me for action plans, weekly drills, collaboration leads, or verification boosts. I'll return step-by-step tactics aligned with your goals.`
      }
    ]
  })

  const quickActions = useMemo(
    () => [
      {
        label: '90-Day Playbook',
        prompt: 'Design a 90-day reputation enhancement plan across all domains with weekly checkpoints.'
      },
      {
        label: 'Verification Boost',
        prompt: 'How can I secure Self Protocol verification and maximize the 50% bonus multiplier?'
      },
      {
        label: 'Collaboration Targets',
        prompt: 'Recommend high-impact partnerships or guilds that accelerate my reputation growth.'
      }
    ],
    []
  )

  return (
    <motion.div
      className="max-w-6xl mx-auto"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="card mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-primary-600 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-primary-700">Reputation Enhancement Agent</h1>
            <p className="text-primary-600">Personalized acceleration tactics for multi-domain reputation dominance.</p>
          </div>
          <span className="agent-badge bg-purple-100 text-purple-700 border-purple-200">● Strategizing</span>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {SNAPSHOT.map(domain => (
            <div key={domain.chainId} className="bg-white/70 border border-primary-200/60 rounded-xl p-4 shadow-soft">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-primary-700">{domain.chainLabel}</h3>
                <Rocket className="w-4 h-4 text-primary-500" />
              </div>
              <div className="text-2xl font-bold text-primary-700">{domain.score}</div>
              <p className="text-xs text-primary-500 mb-3">{Math.round(domain.weight * 100)}% weight in composite score</p>
              <ul className="space-y-2 text-xs text-primary-600 list-disc list-inside">
                {domain.opportunities.map((op, index) => (
                  <li key={index}>{op}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ChatInterface
            chat={chat}
            placeholder="Ask for strategic roadmaps, partner recommendations, verification tactics, or cross-domain boosts..."
            quickActions={quickActions}
          />
        </div>

        <div className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-semibold text-primary-700 mb-4">High-Impact Levers</h3>
            <div className="space-y-3 text-sm text-primary-600">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-primary-500 mt-1" />
                <div>
                  <p className="font-medium text-primary-700">Self Protocol Verification</p>
                  <p>Secure the 1.5x multiplier and unlock exclusive compliance pathways.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Workflow className="w-4 h-4 text-primary-500 mt-1" />
                <div>
                  <p className="font-medium text-primary-700">Cross-Domain Sprints</p>
                  <p>Bundle weekly quests combining DeFi automation, gaming achievements, and dev contributions.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
