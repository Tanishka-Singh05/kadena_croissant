"use client"

import { useMemo } from 'react'
import { useChat } from 'ai/react'
import { motion } from 'framer-motion'
import { Target, Trophy, Clock, Calendar } from 'lucide-react'
import ChatInterface from './ChatInterface'

type Goal = {
  id: string
  chainId: number
  label: string
  target: number
  current: number
  deadline: string
  status: 'on-track' | 'at-risk' | 'off-track'
  nextMilestone: string
}

const SAMPLE_GOALS: Goal[] = [
  {
    id: 'defi-elite',
    chainId: 5920,
    label: 'DeFi Elite Access (1000 pts)',
    target: 1000,
    current: 760,
    deadline: '2025-10-01',
    status: 'on-track',
    nextMilestone: 'Reach 850 pts for liquidity strategist badge'
  },
  {
    id: 'gaming-champion',
    chainId: 5921,
    label: 'Gaming Championship Slot (800 pts)',
    target: 800,
    current: 520,
    deadline: '2025-10-15',
    status: 'at-risk',
    nextMilestone: 'Secure 3 achievement NFTs for +120 pts'
  },
  {
    id: 'dev-master',
    chainId: 5922,
    label: 'Dev Masterclass (900 pts)',
    target: 900,
    current: 640,
    deadline: '2025-11-05',
    status: 'on-track',
    nextMilestone: 'Deploy audited contract for +150 pts'
  }
]

export default function GoalTrackingAgent() {
  const chat = useChat({
    api: '/api/chat/goal-tracker',
    body: { goals: SAMPLE_GOALS },
    initialMessages: [
      {
        id: 'intro',
        role: 'assistant',
        content: `Hi! I'm your Goal Achievement Agent. I track every milestone you set across DeFi, Gaming, and Dev domains so you never miss an exclusive unlock.

Here are your current goals:
• DeFi Elite Access: ${SAMPLE_GOALS[0].current}/${SAMPLE_GOALS[0].target} pts • On track • Deadline ${SAMPLE_GOALS[0].deadline}
• Gaming Championship Slot: ${SAMPLE_GOALS[1].current}/${SAMPLE_GOALS[1].target} pts • At risk • Deadline ${SAMPLE_GOALS[1].deadline}
• Dev Masterclass: ${SAMPLE_GOALS[2].current}/${SAMPLE_GOALS[2].target} pts • On track • Deadline ${SAMPLE_GOALS[2].deadline}

Ask for progress updates, milestone plans, or motivational nudges. I can also create new goals for upcoming exclusivity tiers.`
      }
    ]
  })

  const quickActions = useMemo(
    () => [
      {
        label: 'Weekly Plan',
        prompt: 'Create a week-long task plan to keep all my goals on track.'
      },
      {
        label: 'Risk Alerts',
        prompt: 'Which goals are at risk and what immediate actions should I take?'
      },
      {
        label: 'Set New Goal',
        prompt: 'Help me define a new goal for hitting Dev score 1000 by December.'
      }
    ],
    []
  )

  return (
    <motion.div
      className="max-w-6xl mx-auto"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="card mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-accent-brown flex items-center justify-center">
            <Target className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-primary-700">Goal Achievement Agent</h1>
            <p className="text-primary-600">Stay accountable to every reputation milestone across Kadena Chainweb.</p>
          </div>
          <span className="agent-badge bg-blue-100 text-blue-700 border-blue-200">● Tracking</span>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {SAMPLE_GOALS.map(goal => (
            <div key={goal.id} className="bg-white/70 border border-primary-200/60 rounded-xl p-4 shadow-soft">
              <h3 className="text-sm font-semibold text-primary-700 mb-2">{goal.label}</h3>
              <div className="text-2xl font-bold text-primary-700">{goal.current}</div>
              <p className="text-xs text-primary-500 mb-3">Target {goal.target} pts • Deadline {goal.deadline}</p>
              <div className="space-y-2 text-xs text-primary-600">
                <p className="flex items-center gap-2">
                  <Clock className="w-3 h-3 text-primary-500" />
                  <span>{goal.status === 'on-track' ? 'On schedule' : goal.status === 'at-risk' ? 'Requires attention' : 'Off track'}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Trophy className="w-3 h-3 text-primary-500" />
                  <span>{goal.nextMilestone}</span>
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
            placeholder="Ask for progress reviews, milestone plans, habit schedules, or new goal setups..."
            quickActions={quickActions}
          />
        </div>

        <div className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-semibold text-primary-700 mb-4">Upcoming Checkpoints</h3>
            <div className="space-y-3 text-sm text-primary-600">
              <div className="flex items-start gap-3">
                <Calendar className="w-4 h-4 text-primary-500 mt-1" />
                <div>
                  <p className="font-medium text-primary-700">48h Liquidity Sprint</p>
                  <p>Deploy 2 more LP positions for +80 DeFi pts before Sunday.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="w-4 h-4 text-primary-500 mt-1" />
                <div>
                  <p className="font-medium text-primary-700">Gaming Tournament Prep</p>
                  <p>Complete daily quests to unlock 3 achievement NFTs this week.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
