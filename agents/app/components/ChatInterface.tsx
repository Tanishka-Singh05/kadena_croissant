'use client'

import type { FormEvent } from 'react'
import type { UseChatHelpers } from 'ai/react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, Send } from 'lucide-react'

type QuickAction = {
  label: string
  prompt: string
}

type ChatInterfaceProps = {
  chat: UseChatHelpers
  placeholder: string
  quickActions?: QuickAction[]
}

export default function ChatInterface({ chat, placeholder, quickActions = [] }: ChatInterfaceProps) {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = chat

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    handleSubmit(event)
  }

  return (
    <div className="card flex flex-col h-full">
      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {messages.map(message => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`max-w-xl rounded-2xl px-4 py-3 ${
              message.role === 'user' ? 'bg-primary-500 text-white ml-auto' : 'bg-white/80 border border-primary-200/60 text-primary-800 mr-auto'
            }`}
          >
            <p className="whitespace-pre-line text-sm leading-relaxed">{message.content}</p>
          </motion.div>
        ))}

        <AnimatePresence>
          {isLoading && (
            <motion.div
              className="flex items-center space-x-2 text-primary-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">Agent is thinking...</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {quickActions.length > 0 && (
        <div className="mt-4 mb-3 flex flex-wrap gap-2">
          {quickActions.map(action => (
            <button
              key={action.label}
              className="px-3 py-2 text-xs font-medium bg-primary-100 text-primary-700 rounded-full hover:bg-primary-200 transition"
              onClick={() => handleInputChange({ target: { value: action.prompt } } as any)}
              type="button"
            >
              {action.label}
            </button>
          ))}
        </div>
      )}

      <form onSubmit={onSubmit} className="mt-2 flex gap-2">
        <input
          value={input}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="flex-1 px-4 py-3 rounded-xl border border-primary-200 bg-white/70 focus:outline-none focus:ring-2 focus:ring-primary-400 text-sm"
        />
        <button
          type="submit"
          disabled={isLoading || input.trim().length === 0}
          className="btn-primary flex items-center gap-2"
        >
          <Send className="w-4 h-4" />
          Send
        </button>
      </form>
    </div>
  )
}
