import { useState, useRef, useEffect } from "react"
import { Send, MapPin, Compass, Plane, Bot, User } from "lucide-react"
import axios from "axios"
import { useTranslation } from "react-i18next";
const CustomerRegChatbot = () => {
    const { t } = useTranslation();
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: t("customerRegisterbotText"),
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ])

  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (text) => {
    if (!text.trim()) return

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    try {
      const response = await axios.post("http://localhost:5000/message", {
        user_id: "user_001",
        text,
      })

      const botMessage = {
        id: Date.now() + 1,
        sender: "bot",
        text: response.data.message || "No response from server.",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 2,
          sender: "bot",
          text: "Server error. Please try again later.",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ])
    } finally {
      setIsTyping(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleSendMessage(inputValue)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-t-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
              <Bot className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">GuideBuddy Assistant</h1>
              <p className="text-sm text-gray-300">Register your customers</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <p className="text-sm text-gray-300">Online</p>
              </div>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-white/5 border-x border-white/20">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "user" ? "flex-row-reverse" : "flex-row"
              } gap-3`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  msg.sender === "bot"
                    ? "bg-gradient-to-br from-cyan-400 to-blue-500"
                    : "bg-gradient-to-br from-emerald-400 to-cyan-500"
                }`}
              >
                {msg.sender === "bot" ? (
                  <Bot className="w-6 h-6 text-white" />
                ) : (
                  <User className="w-6 h-6 text-white" />
                )}
              </div>

              <div className="max-w-[70%]">
                <div
                  className={`px-4 py-3 rounded-2xl text-white ${
                    msg.sender === "bot"
                      ? "bg-white/10 border border-white/20"
                      : "bg-gradient-to-r from-cyan-400 to-blue-500"
                  }`}
                >
                  {msg.text}
                </div>
                <p className="text-xs text-gray-400 mt-1">{msg.timestamp}</p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-3 rounded-2xl shadow-lg">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce animation-delay-150"></div>
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce animation-delay-300"></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="bg-white/10 border border-white/20 rounded-b-2xl p-4">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Register a new customer..."
              className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white outline-none"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="px-4 md:px-6 py-3 md:py-3.5 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all transform hover:scale-105 active:scale-95 disabled:transform-none flex items-center justify-center gap-2 hover: cursor-pointer"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CustomerRegChatbot
