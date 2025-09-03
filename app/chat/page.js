// pages/index.js
"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

const ChatInterface = () => {
  const [pdfLink, setPdfLink] = useState("");

  // Read PDF from query string manually
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let pdf = params.get("pdf");
    if (pdf) {
      pdf = pdf.replace("prsindia.org..", "prsindia.org"); // fix double dot
      setPdfLink(pdf);
    }
  }, []);

  const openPdf = () => {
    if (pdfLink) window.open(pdfLink, "_blank");
  };

  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Welcome! I'm here to help you create accurate project estimates. What kind of project are you working on?",
      sender: "assistant",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [showPdf, setShowPdf] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [summary, setSummary] = useState(
    "Conversation Summary\n\nYour chat summary will appear here as you interact. Key insights and important project details will be automatically captured."
  );
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;

    const newMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages([...messages, newMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate assistant response
    setTimeout(() => {
      const responses = [
        "That's a great question! Let me help you break down the project requirements and create a detailed estimate.",
        "I'll need a bit more information to provide an accurate estimate. Could you tell me more about the project scope?",
        "Based on what you've shared, I can help you create a comprehensive project timeline and cost estimate.",
        "Excellent! I'll analyze your requirements and provide both time and budget estimates for your project.",
      ];

      const assistantResponse = {
        id: messages.length + 2,
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: "assistant",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, assistantResponse]);
      setIsTyping(false);

      // Update summary
      setSummary(
        (prev) =>
          prev +
          `\n\n${
            assistantResponse.timestamp
          } - User inquiry: "${inputMessage.substring(0, 50)}${
            inputMessage.length > 50 ? "..." : ""
          }"\nResponse provided with project guidance`
      );
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const TypingIndicator = () => (
    <div className="flex items-center space-x-2 p-4 max-w-xs">
      <div className="bg-white border rounded-2xl px-4 py-3 flex items-center space-x-1 shadow-sm">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
        <span className="text-xs text-gray-500 ml-2">Thinking...</span>
      </div>
    </div>
  );

  return (
    <>
      <Head>
        <title>Rashtram AI</title>
        <meta name="description" content="AI-powered project estimation tool" />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css"
          rel="stylesheet"
        />
      </Head>

      <div className="flex h-screen bg-white">
        {/* Main Chat Area */}
        <div
          className={`${
            showPdf ? "w-1/2" : "flex-1"
          } flex flex-col bg-white transition-all duration-300 ease-in-out`}
          style={{ borderRight: showPdf ? "1px solid #B20F38" : "none" }}
        >
          {/* Header */}
          <div
            className="bg-white px-6 py-4 shadow-sm"
            style={{ borderBottom: "1px solid #B20F38" }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                  style={{ backgroundColor: "#B20F38" }}
                >
                  <span className="text-white text-xl font-bold">RU</span>
                </div>
                <div>
                  <h1
                    className="text-2xl font-bold"
                    style={{ color: "#B20F38" }}
                  >
                    Rashtram AI
                  </h1>
                  <p className="text-gray-600 text-sm">AI-powered Summarizer</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-500">
                  <div
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ backgroundColor: "#B20F38" }}
                  ></div>
                  <span>Online</span>
                </div>
                <button
                  className="text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  style={{ backgroundColor: "#B20F38" }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#9a0d2f")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "#B20F38")
                  }
                  onClick={openPdf}
                >
                  View PDF
                </button>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                } animate-fade-in-up`}
              >
                <div
                  className={`max-w-xs lg:max-w-md xl:max-w-lg ${
                    message.sender === "user" ? "order-1" : "order-2"
                  }`}
                >
                  {message.sender === "assistant" && (
                    <div className="flex items-center space-x-2 mb-1">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: "#B20F38" }}
                      >
                        <span className="text-white text-xs">AI</span>
                      </div>
                      <span className="text-xs text-gray-500 font-medium">
                        Assistant
                      </span>
                    </div>
                  )}

                  <div
                    className={`px-4 py-3 rounded-2xl shadow-sm ${
                      message.sender === "user"
                        ? "text-white rounded-br-md"
                        : "bg-white text-gray-800 rounded-bl-md"
                    }`}
                    style={{
                      backgroundColor:
                        message.sender === "user" ? "#B20F38" : "white",
                      border:
                        message.sender === "assistant"
                          ? "1px solid #f3f4f6"
                          : "none",
                    }}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>

                  <div
                    className={`flex items-center mt-1 space-x-1 ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <span className="text-xs text-gray-400">
                      {message.timestamp}
                    </span>
                    {message.sender === "user" && (
                      <svg
                        className="w-3 h-3 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div
            className="bg-white px-6 py-4"
            style={{ borderTop: "1px solid #f3f4f6" }}
          >
            <div className="flex items-end space-x-4">
              <div className="flex-1 relative">
                <textarea
                  ref={textareaRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Describe your project or ask for an estimate..."
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-2xl resize-none transition-all duration-200 bg-white hover:border-gray-400 max-h-32"
                  style={{
                    "&:focus": {
                      outline: "none",
                      borderColor: "#B20F38",
                      boxShadow: `0 0 0 2px rgba(178, 15, 56, 0.1)`,
                    },
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#B20F38";
                    e.target.style.boxShadow =
                      "0 0 0 2px rgba(178, 15, 56, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#d1d5db";
                    e.target.style.boxShadow = "none";
                  }}
                  rows={1}
                  // style={{ minHeight: "48px" }}
                />
                <div className="absolute right-3 top-3 text-gray-400">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </div>
              </div>

              <button
                onClick={handleSendMessage}
                disabled={inputMessage.trim() === ""}
                className={`p-3 rounded-2xl transition-all duration-200 transform hover:scale-105 ${
                  inputMessage.trim()
                    ? "text-white shadow-lg hover:shadow-xl"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
                style={{
                  backgroundColor: inputMessage.trim() ? "#B20F38" : "#e5e7eb",
                }}
                onMouseEnter={(e) => {
                  if (inputMessage.trim()) {
                    e.target.style.backgroundColor = "#9a0d2f";
                  }
                }}
                onMouseLeave={(e) => {
                  if (inputMessage.trim()) {
                    e.target.style.backgroundColor = "#B20F38";
                  }
                }}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>

            <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
              <span>Press Enter to send, Shift + Enter for new line</span>
              <span>{inputMessage.length}/1000</span>
            </div>
          </div>
        </div>

        {/* PDF Viewer */}
        {showPdf && (
          <div
            className="w-1/2 bg-white shadow-xl flex flex-col animate-slide-in-right"
            style={{ borderLeft: "1px solid #B20F38" }}
          >
            <div
              className="px-6 py-4"
              style={{
                backgroundColor: "#B20F38",
                borderBottom: "1px solid #B20F38",
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                    <svg
                      className="w-4 h-4"
                      style={{ color: "#B20F38" }}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">
                      Document Viewer
                    </h3>
                    <p className="text-white opacity-80 text-sm">
                      Project documents and estimates
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowPdf(false)}
                  className="text-white hover:text-gray-200 transition-colors duration-200"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex-1 bg-white flex items-center justify-center">
              <div className="text-center p-8">
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
                  style={{ backgroundColor: "#B20F38" }}
                >
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  No Document Selected
                </h3>
                <p className="text-gray-600 mb-6">
                  Upload or select a project document to view here
                </p>
                <button
                  className="text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
                  style={{ backgroundColor: "#B20F38" }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#9a0d2f")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "#B20F38")
                  }
                >
                  Upload Document
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Sidebar */}
        <div
          className="w-80 bg-white shadow-xl flex flex-col"
          style={{ borderLeft: "1px solid #B20F38" }}
        >
          {/* Summary Section */}
          <div className="p-6" style={{ borderBottom: "1px solid #f3f4f6" }}>
            <div className="flex items-center space-x-2 mb-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: "#B20F38" }}
              >
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Summary</h3>
            </div>

            <div
              className="bg-gray-50 rounded-xl p-4 max-h-64 overflow-y-auto"
              style={{ border: "1px solid #f3f4f6" }}
            >
              <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                {summary}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="p-6 flex-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
              <span>⚡</span>
              <span>Quick Actions</span>
            </h3>
            <div className="space-y-3">
              {[
                { label: "Export Summary" },
                { label: "Save Estimate" },
                { label: "New Project" },
                { label: "Copy Results" },
              ].map((action, index) => (
                <button
                  key={index}
                  className="w-full text-white p-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
                  style={{ backgroundColor: "#B20F38" }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#9a0d2f")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "#B20F38")
                  }
                >
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default ChatInterface;
