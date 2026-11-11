
import { useEffect, useRef, useState } from 'react'
import {
  Bot,
  X,
  Send,
  MessageCircle,
  Leaf,
  Sparkles,
  LoaderCircle,
  Trash2
} from 'lucide-react'

const API_URL = 'http://localhost:5000/api/chat'

const suggestions = [
  'How often should I water Aloe Vera?',
  'Which succulents are best for beginners?',
  'Why are my plant leaves turning yellow?',
  'How much sunlight do succulents need?'
]

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: "Hello! 🌱 I'm your AI Assistant. I can help you explore succulents, understand plant care, troubleshoot common problems, and learn more about your garden. What would you like to know?"
    }
  ])

  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    })
  }, [messages, isLoading])

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
    }
  }, [isOpen])

  const sendMessage = async (customMessage) => {
    const text = (customMessage || message).trim()

    if (!text || isLoading) return

    const userMessage = {
      role: 'user',
      text
    }

    setMessages(prev => [...prev, userMessage])
    setMessage('')
    setIsLoading(true)

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: text,
          history: messages.map(item => ({
            role: item.role,
            text: item.text
          }))
        })
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Unable to get a response.')
      }

      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          text: data.reply
        }
      ])
    } catch (error) {
      console.error('Chatbot error:', error)

      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          text: error.message || 'Something went wrong. Please try again.'
        }
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    sendMessage()
  }

  const clearChat = () => {
    setMessages([
      {
        role: 'assistant',
        text: "Hello again! 🌱 What would you like to explore today?"
      }
    ])
  }

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="
            fixed bottom-24 right-4 z-[1000]
            flex h-14 w-14 items-center justify-center
            rounded-full bg-[#20372a] text-white shadow-xl
            transition-all duration-300
            hover:scale-105 hover:bg-[#2d4939]

            sm:bottom-24 sm:right-6 sm:h-16 sm:w-16
            md:bottom-6
          "
          aria-label="Open GreeHeal AI Assistant"
        >
          <MessageCircle size={25} />

          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-[#8eae75]">
            <span className="h-2 w-2 rounded-full bg-white" />
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="
          fixed inset-0 z-[1000]
          flex h-[100dvh] w-full flex-col
          overflow-hidden bg-[#f8faf6]

          sm:inset-auto
          sm:bottom-24 sm:right-4
          sm:h-[min(650px,calc(100dvh-120px))]
          sm:w-[min(400px,calc(100vw-32px))]
          sm:rounded-2xl
          sm:border sm:border-[#e3e9df]
          sm:shadow-2xl

          md:bottom-6 md:right-6
        ">

          {/* Header */}
          <div className="flex shrink-0 items-center justify-between bg-[#20372a] px-4 py-3 text-white sm:px-5 sm:py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 sm:h-11 sm:w-11">
                <Bot size={24} />
              </div>

              <div>
                <h2 className="text-sm font-semibold sm:text-base">
                  Sabz Sehra AI
                </h2>

                <div className="mt-0.5 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#a8d58c]" />
                  <span className="text-xs text-green-100">
                    Your Plant Assistant
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={clearChat}
                disabled={isLoading}
                className="rounded-lg p-2 text-white/80 transition hover:bg-white/10 hover:text-white disabled:opacity-40"
                title="Clear conversation"
                aria-label="Clear conversation"
              >
                <Trash2 size={17} />
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-2 text-white/80 transition hover:bg-white/10 hover:text-white"
                aria-label="Close chatbot"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Welcome Banner */}
          <div className="shrink-0 border-b border-[#e7ecdf] bg-white px-4 py-3 sm:px-5">
            <div className="flex items-center gap-2 text-xs font-medium text-[#38523b] sm:text-sm">
              <Sparkles size={16} className="shrink-0" />
              Growing knowledge, one question at a time.
            </div>
          </div>

          {/* Messages */}
          <div className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain px-3 py-4 sm:px-4 sm:py-5">

            {messages.map((item, index) => (
              <div
                key={index}
                className={`flex items-start gap-2 ${
                  item.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {item.role === 'assistant' && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e5eddf] text-[#38523b]">
                    <Leaf size={16} />
                  </div>
                )}

                <div
                  className={`max-w-[85%] whitespace-pre-wrap break-words rounded-2xl px-3 py-3 text-sm leading-6 sm:px-4 ${
                    item.role === 'user'
                      ? 'rounded-tr-sm bg-[#20372a] text-white'
                      : 'rounded-tl-sm border border-[#e6ebdf] bg-white text-[#344438] shadow-sm'
                  }`}
                >
                  {item.text}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isLoading && (
              <div className="flex items-start gap-2">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e5eddf] text-[#38523b]">
                  <Leaf size={16} />
                </div>

                <div className="flex items-center gap-2 rounded-2xl rounded-tl-sm border border-[#e6ebdf] bg-white px-4 py-3 text-sm text-[#738174] shadow-sm">
                  <LoaderCircle size={15} className="animate-spin" />
                  thinking...
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions */}
          {messages.length === 1 && (
            <div className="shrink-0 border-t border-[#e7ecdf] bg-white px-3 py-3 sm:px-4">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-[#829080] sm:text-xs">
                Suggested questions
              </p>

              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => sendMessage(suggestion)}
                    disabled={isLoading}
                    className="rounded-full border border-[#dce6d6] bg-[#f7faf4] px-3 py-2 text-left text-[11px] text-[#38523b] transition hover:border-[#8eae75] hover:bg-[#edf4e8] disabled:opacity-50 sm:text-xs"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Message Input */}
          <form
            onSubmit={handleSubmit}
            className="shrink-0 border-t border-[#e7ecdf] bg-white p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:p-4"
          >
            <div className="flex items-center gap-2 rounded-xl border border-[#dfe7db] bg-[#f8faf6] p-2 transition focus-within:border-[#8eae75] focus-within:ring-2 focus-within:ring-[#8eae75]/20">
              <input
                ref={inputRef}
                type="text"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Ask anything about plants..."
                disabled={isLoading}
                maxLength={4000}
                className="min-w-0 flex-1 bg-transparent px-2 py-2 text-sm text-[#344438] outline-none placeholder:text-[#9ba69a] disabled:opacity-50"
              />

              <button
                type="submit"
                disabled={!message.trim() || isLoading}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#20372a] text-white transition hover:bg-[#38523b] disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Send message"
              >
                <Send size={17} />
              </button>
            </div>

            <p className="mt-2 text-center text-[10px] text-[#9aa59a]">
              AI Assistant can make mistakes. Verify important plant-care advice.
            </p>
          </form>
        </div>
      )}
    </>
  )
}

export default Chatbot
