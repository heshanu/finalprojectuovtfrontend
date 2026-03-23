import { useState, useRef, useEffect} from "react";
import ReactDOMServer from "react-dom/server";
import {
  Send,
  MapPin,
  Compass,
  Plane,
  Bot,
  User,
  Download,
  X,
} from "lucide-react";
import axios from "axios";
import FormattedText from "../../components/FormattedText";
import { SpinnerCircular } from "spinners-react";
import { useTranslation } from "react-i18next";
const TravelRecommChatbot = () => {
    const { t } = useTranslation();
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: t("travelRecommendationsbotText"),
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const [showPreview, setShowPreview] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const previewRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Download handler
  const handleDownload = async () => {
    if (messages.length <= 1) {
      alert("No travel plan to download. Start chatting first!");
      return;
    }

    setShowPreview(true);
  };

  // Generate PDF
const generatePDF = async () => {
  try {
    setIsDownloading(true);

    const html2pdf = (await import("html2pdf.js")).default;

    // Get last bot message
    const lastBotMessage = [...messages]
      .reverse()
      .find((msg) => msg.sender === "bot");

    // Create CLEAN HTML
    const cleanHTML = `
  <div style="font-family: 'Segoe UI', Arial, sans-serif; padding: 30px; background: #f4f7fb; color: #1f2937; overflow: visible;">
    
    <!-- Header -->
    <div style="text-align: center; margin-bottom: 30px;">
      <h1 style="margin: 0; font-size: 28px; color: #2563eb;">
        ✈️ GuideBuddy Travel Plan
      </h1>
      <p style="margin-top: 5px; color: #6b7280; font-size: 14px;">
        Generated on ${new Date().toLocaleDateString()}
      </p>
    </div>

    <!-- Card -->
    <div style="
      background: #ffffff;
      padding: 25px;
      margin-bottom: 30px;
      border-radius: 12px;
      border: 1px solid #e5e7eb;
      box-shadow: 0 4px 10px rgba(0,0,0,0.05);
      page-break-inside: avoid;
    ">
      
      <div style="
        font-size: 14px;
        font-weight: 600;
        color: #2563eb;
        margin-bottom: 15px;
      ">
        Travel Plan Summary
      </div>

      ${
        lastBotMessage
          ? `<div style="
               line-height: 1.8;
               font-size: 15px;
               color: #374151;
             ">
              ${ReactDOMServer.renderToStaticMarkup( 
              <FormattedText text={lastBotMessage.text} /> )}
             </div>`
          : `<p style="color:#6b7280;">No travel plan generated yet.</p>`
      }

    </div>

    <!-- Footer -->
    <div style="margin-top: 50px; padding-bottom: 20px; text-align: center; font-size: 12px; color: #9ca3af;">
      🌍 Powered by GuideBuddy Assistant
    </div>

  </div>
`;

    // 🧠 Create temporary container
    const container = document.createElement("div");
    container.innerHTML = cleanHTML;

    document.body.appendChild(container);

  const opt = {
  margin: [10, 10, 20, 10], // 👈 add bottom margin
  filename: "travel-plan.pdf",
  image: { type: "jpeg", quality: 0.98 },

  html2canvas: {
    scale: 2,
    backgroundColor: "#ffffff",
    useCORS: true,
    scrollY: 0
  },

  jsPDF: {
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  },

  pagebreak: {
    mode: ["css", "legacy"], // 👈 IMPORTANT FIX
    avoid: "div"
  }
};

    await html2pdf().set(opt).from(container).save();

    document.body.removeChild(container);

    setIsDownloading(false);
    setShowPreview(false);
  } catch (error) {
    console.error("Error generating PDF:", error);
    alert("Failed to generate PDF. Please try again.");
    setIsDownloading(false);
  }
};

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      const response = await axios.post("http://localhost:5000/travel-agent", {
        user_id: "user_001",
        text,
      });

      const botMessage = {
        id: Date.now() + 1,
        sender: "bot",
        text: response.data.message || "No response from server.",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, botMessage]);
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
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

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
              <h1 className="text-xl font-bold text-white">
                GuideBuddy Assistant
              </h1>
              <p className="text-sm text-gray-300">
                Get your travel recommendation
              </p>
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
                  {msg.sender === "bot" ? (
                    <FormattedText text={msg.text} />
                  ) : (
                    msg.text
                  )}
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
              placeholder="Ask me anything about travel..."
              className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white outline-none"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="px-4 md:px-6 py-3 md:py-3.5 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all transform hover:scale-105 active:scale-95 disabled:transform-none flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleDownload}
              className="px-4 md:px-6 py-3 md:py-3.5 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-white font-semibold rounded-xl transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center"
            >
              <Download className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">
                Travel Plan - GuideBuddy
              </h2>
              <button
                onClick={() => setShowPreview(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Preview Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div
                ref={previewRef}
                className="bg-gradient-to-br from-blue-50 to-slate-50 p-8 rounded-lg"
              >
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    Your Travel Plan - GuideBuddy
                  </h1>
                  <p className="text-gray-600">
                    Generated on {new Date().toLocaleDateString()}
                  </p>
                </div>

                <div className="space-y-6">
                  {(() => {
                    // Find the last bot message
                    const lastBotMessage = [...messages]
                      .reverse()
                      .find((msg) => msg.sender === "bot");
                    return lastBotMessage ? (
                      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-start gap-3 mb-4">
                          <div className="px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800">
                            Travel Plan Summary
                          </div>
                          <span className="text-xs text-gray-500">
                            {lastBotMessage.timestamp}
                          </span>
                        </div>
                        <div className="text-gray-700 whitespace-pre-wrap leading-relaxed text-base">
                          <FormattedText text={lastBotMessage.text} />
                        </div>
                      </div>
                    ) : (
                      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <p className="text-gray-500">
                          No travel plan generated yet.
                        </p>
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => setShowPreview(false)}
                className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-300 text-gray-800 font-semibold hover:bg-gray-100 transition"
              >
                Close
              </button>
              <button
                onClick={generatePDF}
                disabled={isDownloading}
                className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold transition flex items-center justify-center gap-2"
              >
                {isDownloading ? (
                  <>
                    <SpinnerCircular
                      size={18}
                      thickness={180}
                      speed={140}
                      color="white"
                    />
                    Generating PDF...
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    Download as PDF
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TravelRecommChatbot;
