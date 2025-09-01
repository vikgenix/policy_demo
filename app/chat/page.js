// pages/index.js
"use client";
import React, { useState, useRef, useEffect } from "react";
import Head from "next/head";

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Welcome! I'm here to help you create accurate project estimates. What kind of project are you working on?",
      sender: "assistant",
      timestamp: "10:00 AM",
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
                  onClick={() => setShowPdf(!showPdf)}
                  className="text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  style={{ backgroundColor: "#B20F38" }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#9a0d2f")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "#B20F38")
                  }
                >
                  {showPdf ? "Hide PDF" : "View PDF"}
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

// pages/index.js
// "use client"
// import React, { useState } from "react";
// import Head from "next/head";

// const ChatInterface = () => {
//   const [messages, setMessages] = useState([
//     {
//       id: 1,
//       text: "Welcome! How can I help you today?",
//       sender: "assistant",
//       timestamp: "10:00 AM",
//     },
//   ]);
//   const [inputMessage, setInputMessage] = useState("");
//   const [showPdf, setShowPdf] = useState(false);
//   const [summary, setSummary] = useState(
//     "Chat Summary will appear here as you interact. Key points and important information will be automatically highlighted."
//   );

//   const handleSendMessage = () => {
//     if (inputMessage.trim() === "") return;

//     const newMessage = {
//       id: messages.length + 1,
//       text: inputMessage,
//       sender: "user",
//       timestamp: new Date().toLocaleTimeString([], {
//         hour: "2-digit",
//         minute: "2-digit",
//       }),
//     };

//     setMessages([...messages, newMessage]);
//     setInputMessage("");

//     // Simulate assistant response
//     setTimeout(() => {
//       const assistantResponse = {
//         id: messages.length + 2,
//         text: "Thank you for your message. I'm here to help with your project estimates and any questions you might have.",
//         sender: "assistant",
//         timestamp: new Date().toLocaleTimeString([], {
//           hour: "2-digit",
//           minute: "2-digit",
//         }),
//       };
//       setMessages((prev) => [...prev, assistantResponse]);

//       // Update summary
//       setSummary(
//         (prev) =>
//           prev +
//           `\n\n• User asked: "${inputMessage}"\n• Response provided at ${assistantResponse.timestamp}`
//       );
//     }, 1000);
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   return (
//     <>
//       <Head>
//         <title>Project Estimation Chat</title>
//         <meta
//           name="description"
//           content="Interactive chat interface for project estimates"
//         />
//       </Head>

//       <div
//         style={{
//           display: "flex",
//           height: "100vh",
//           fontFamily:
//             '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
//           backgroundColor: "#f8f9fa",
//         }}
//       >
//         {/* Main Chat Area */}
//         <div
//           style={{
//             flex: showPdf ? "0 0 50%" : "1",
//             display: "flex",
//             flexDirection: "column",
//             backgroundColor: "white",
//             borderRight: "1px solid #e1e5e9",
//           }}
//         >
//           {/* Header */}
//           <div
//             style={{
//               padding: "20px",
//               borderBottom: "1px solid #e1e5e9",
//               backgroundColor: "white",
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//             }}
//           >
//             <div>
//               <h1
//                 style={{
//                   margin: "0",
//                   color: "#B20F38",
//                   fontSize: "24px",
//                   fontWeight: "600",
//                 }}
//               >
//                 Project Estimation Assistant
//               </h1>
//               <p
//                 style={{
//                   margin: "5px 0 0 0",
//                   color: "#666",
//                   fontSize: "14px",
//                 }}
//               >
//                 Get accurate estimates for your projects
//               </p>
//             </div>
//             <button
//               onClick={() => setShowPdf(!showPdf)}
//               style={{
//                 backgroundColor: "#B20F38",
//                 color: "white",
//                 border: "none",
//                 padding: "10px 20px",
//                 borderRadius: "6px",
//                 cursor: "pointer",
//                 fontSize: "14px",
//                 fontWeight: "500",
//                 transition: "all 0.2s",
//               }}
//               onMouseOver={(e) => (e.target.style.backgroundColor = "#9a0d2f")}
//               onMouseOut={(e) => (e.target.style.backgroundColor = "#B20F38")}
//             >
//               {showPdf ? "Hide PDF" : "View PDF"}
//             </button>
//           </div>

//           {/* Messages Area */}
//           <div
//             style={{
//               flex: "1",
//               overflowY: "auto",
//               padding: "20px",
//               display: "flex",
//               flexDirection: "column",
//               gap: "16px",
//             }}
//           >
//             {messages.map((message) => (
//               <div
//                 key={message.id}
//                 style={{
//                   alignSelf:
//                     message.sender === "user" ? "flex-end" : "flex-start",
//                   maxWidth: "70%",
//                 }}
//               >
//                 <div
//                   style={{
//                     backgroundColor:
//                       message.sender === "user" ? "#B20F38" : "#f1f3f4",
//                     color: message.sender === "user" ? "white" : "#333",
//                     padding: "12px 16px",
//                     borderRadius:
//                       message.sender === "user"
//                         ? "18px 18px 4px 18px"
//                         : "18px 18px 18px 4px",
//                     fontSize: "14px",
//                     lineHeight: "1.4",
//                     wordWrap: "break-word",
//                   }}
//                 >
//                   {message.text}
//                 </div>
//                 <div
//                   style={{
//                     fontSize: "12px",
//                     color: "#888",
//                     marginTop: "4px",
//                     textAlign: message.sender === "user" ? "right" : "left",
//                   }}
//                 >
//                   {message.timestamp}
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Input Area */}
//           <div
//             style={{
//               padding: "20px",
//               borderTop: "1px solid #e1e5e9",
//               backgroundColor: "white",
//             }}
//           >
//             <div
//               style={{
//                 display: "flex",
//                 gap: "12px",
//                 alignItems: "flex-end",
//               }}
//             >
//               <textarea
//                 value={inputMessage}
//                 onChange={(e) => setInputMessage(e.target.value)}
//                 onKeyPress={handleKeyPress}
//                 placeholder="Type your message here... (Press Enter to send)"
//                 style={{
//                   flex: "1",
//                   padding: "12px 16px",
//                   border: "2px solid #e1e5e9",
//                   borderRadius: "24px",
//                   fontSize: "14px",
//                   resize: "none",
//                   minHeight: "44px",
//                   maxHeight: "120px",
//                   outline: "none",
//                   fontFamily: "inherit",
//                   transition: "border-color 0.2s",
//                 }}
//                 onFocus={(e) => (e.target.style.borderColor = "#B20F38")}
//                 onBlur={(e) => (e.target.style.borderColor = "#e1e5e9")}
//                 rows={1}
//               />
//               <button
//                 onClick={handleSendMessage}
//                 disabled={inputMessage.trim() === ""}
//                 style={{
//                   backgroundColor: inputMessage.trim() ? "#B20F38" : "#ccc",
//                   color: "white",
//                   border: "none",
//                   borderRadius: "50%",
//                   width: "44px",
//                   height: "44px",
//                   cursor: inputMessage.trim() ? "pointer" : "not-allowed",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   fontSize: "18px",
//                   transition: "all 0.2s",
//                 }}
//                 onMouseOver={(e) => {
//                   if (inputMessage.trim()) {
//                     e.target.style.backgroundColor = "#9a0d2f";
//                   }
//                 }}
//                 onMouseOut={(e) => {
//                   if (inputMessage.trim()) {
//                     e.target.style.backgroundColor = "#B20F38";
//                   }
//                 }}
//               >
//                 ➤
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* PDF Viewer (when toggled) */}
//         {showPdf && (
//           <div
//             style={{
//               flex: "0 0 50%",
//               backgroundColor: "white",
//               borderLeft: "1px solid #e1e5e9",
//               display: "flex",
//               flexDirection: "column",
//             }}
//           >
//             <div
//               style={{
//                 padding: "20px",
//                 borderBottom: "1px solid #e1e5e9",
//                 backgroundColor: "#f8f9fa",
//               }}
//             >
//               <h3
//                 style={{
//                   margin: "0",
//                   color: "#B20F38",
//                   fontSize: "18px",
//                   fontWeight: "600",
//                 }}
//               >
//                 Document Viewer
//               </h3>
//             </div>
//             <div
//               style={{
//                 flex: "1",
//                 padding: "20px",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 backgroundColor: "#f8f9fa",
//                 color: "#666",
//                 fontSize: "14px",
//               }}
//             >
//               <div style={{ textAlign: "center" }}>
//                 <div
//                   style={{
//                     width: "64px",
//                     height: "64px",
//                     backgroundColor: "#B20F38",
//                     borderRadius: "50%",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     margin: "0 auto 16px",
//                     color: "white",
//                     fontSize: "24px",
//                   }}
//                 >
//                   📄
//                 </div>
//                 <p>PDF viewer will display documents here</p>
//                 <p style={{ fontSize: "12px", color: "#999" }}>
//                   Upload or select a document to view
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Sidebar */}
//         <div
//           style={{
//             flex: "0 0 300px",
//             backgroundColor: "white",
//             borderLeft: "1px solid #e1e5e9",
//             display: "flex",
//             flexDirection: "column",
//           }}
//         >
//           {/* Summary Section */}
//           <div
//             style={{
//               padding: "20px",
//               borderBottom: "1px solid #e1e5e9",
//             }}
//           >
//             <h3
//               style={{
//                 margin: "0 0 16px 0",
//                 color: "#B20F38",
//                 fontSize: "16px",
//                 fontWeight: "600",
//               }}
//             >
//               Conversation Summary
//             </h3>
//             <div
//               style={{
//                 backgroundColor: "#f8f9fa",
//                 padding: "16px",
//                 borderRadius: "8px",
//                 fontSize: "13px",
//                 lineHeight: "1.5",
//                 color: "#555",
//                 maxHeight: "200px",
//                 overflowY: "auto",
//               }}
//             >
//               {summary}
//             </div>
//           </div>

//           {/* Quick Actions */}
//           <div
//             style={{
//               padding: "20px",
//             }}
//           >
//             <h3
//               style={{
//                 margin: "0 0 16px 0",
//                 color: "#B20F38",
//                 fontSize: "16px",
//                 fontWeight: "600",
//               }}
//             >
//               Quick Actions
//             </h3>
//             <div
//               style={{ display: "flex", flexDirection: "column", gap: "8px" }}
//             >
//               <button
//                 style={{
//                   backgroundColor: "transparent",
//                   color: "#B20F38",
//                   border: "1px solid #B20F38",
//                   padding: "8px 12px",
//                   borderRadius: "6px",
//                   cursor: "pointer",
//                   fontSize: "13px",
//                   fontWeight: "500",
//                   transition: "all 0.2s",
//                 }}
//                 onMouseOver={(e) => {
//                   e.target.style.backgroundColor = "#B20F38";
//                   e.target.style.color = "white";
//                 }}
//                 onMouseOut={(e) => {
//                   e.target.style.backgroundColor = "transparent";
//                   e.target.style.color = "#B20F38";
//                 }}
//               >
//                 Export Summary
//               </button>
//               <button
//                 style={{
//                   backgroundColor: "transparent",
//                   color: "#B20F38",
//                   border: "1px solid #B20F38",
//                   padding: "8px 12px",
//                   borderRadius: "6px",
//                   cursor: "pointer",
//                   fontSize: "13px",
//                   fontWeight: "500",
//                   transition: "all 0.2s",
//                 }}
//                 onMouseOver={(e) => {
//                   e.target.style.backgroundColor = "#B20F38";
//                   e.target.style.color = "white";
//                 }}
//                 onMouseOut={(e) => {
//                   e.target.style.backgroundColor = "transparent";
//                   e.target.style.color = "#B20F38";
//                 }}
//               >
//                 Clear Chat
//               </button>
//               <button
//                 style={{
//                   backgroundColor: "transparent",
//                   color: "#B20F38",
//                   border: "1px solid #B20F38",
//                   padding: "8px 12px",
//                   borderRadius: "6px",
//                   cursor: "pointer",
//                   fontSize: "13px",
//                   fontWeight: "500",
//                   transition: "all 0.2s",
//                 }}
//                 onMouseOver={(e) => {
//                   e.target.style.backgroundColor = "#B20F38";
//                   e.target.style.color = "white";
//                 }}
//                 onMouseOut={(e) => {
//                   e.target.style.backgroundColor = "transparent";
//                   e.target.style.color = "#B20F38";
//                 }}
//               >
//                 Save Estimate
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ChatInterface;

// "use client";

// import { Upload, Send, File, CheckCircle, Sparkles } from "lucide-react";
// import { useState } from "react";

// export default function ChatColumn() {
//   const [dummyFiles] = useState([
//     { name: "Sample.pdf", size: 1048576 },
//     { name: "Report.docx", size: 524288 },
//   ]);
//   const totalFiles = dummyFiles.length;

//   return (
//     <div
//       style={{
//         flex: 1,
//         display: "flex",
//         flexDirection: "column",
//         borderRight: "1px solid #B20F38",
//         background: "linear-gradient(to bottom, white, #f8f8f8)",
//       }}
//     >
//       {/* Header */}
//       <div
//         style={{
//           padding: "16px",
//           borderBottom: "1px solid #B20F38",
//           display: "flex",
//           alignItems: "center",
//           gap: "12px",
//         }}
//       >
//         <div
//           style={{
//             width: "40px",
//             height: "40px",
//             borderRadius: "12px",
//             background: "linear-gradient(to right, #B20F38, #8A0C2D)",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <Sparkles size={20} color="white" />
//         </div>
//         <div>
//           <h2
//             style={{
//               margin: 0,
//               fontSize: "1.25rem",
//               fontWeight: "bold",
//               color: "#B20F38",
//             }}
//           >
//             Rashtram AI
//           </h2>
//           <p style={{ margin: 0, fontSize: "0.875rem", color: "#555" }}>
//             Upload documents and start chatting
//           </p>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div
//         style={{
//           flex: 1,
//           padding: "32px",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <div style={{ textAlign: "center", marginBottom: "24px" }}>
//           <h3
//             style={{
//               fontSize: "1.5rem",
//               fontWeight: "bold",
//               color: "#B20F38",
//               marginBottom: "8px",
//             }}
//           >
//             Your Documents
//           </h3>
//           <p style={{ color: "#555" }}>
//             You have {totalFiles} document{totalFiles !== 1 ? "s" : ""} ready
//             for review
//           </p>
//         </div>

//         {/* File List */}
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             gap: "12px",
//             maxWidth: "400px",
//             width: "100%",
//           }}
//         >
//           {dummyFiles.map((file, index) => (
//             <div
//               key={index}
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "12px",
//                 padding: "12px",
//                 border: "1px solid #B20F38",
//                 borderRadius: "12px",
//                 background: "#fff",
//               }}
//             >
//               <div
//                 style={{
//                   width: "40px",
//                   height: "40px",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   borderRadius: "8px",
//                   background: "#fdecea",
//                   border: "1px solid #B20F38",
//                 }}
//               >
//                 <File size={20} color="#B20F38" />
//               </div>
//               <div style={{ flex: 1 }}>
//                 <p style={{ margin: 0, fontWeight: "500", color: "#333" }}>
//                   {file.name}
//                 </p>
//                 <p style={{ margin: 0, color: "#777", fontSize: "0.875rem" }}>
//                   {(file.size / 1024 / 1024).toFixed(2)} MB
//                 </p>
//               </div>
//               <CheckCircle size={20} color="#B20F38" />
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Chat Input */}
//       <div
//         style={{
//           padding: "16px",
//           borderTop: "1px solid #B20F38",
//           display: "flex",
//           alignItems: "center",
//           gap: "12px",
//         }}
//       >
//         <input
//           type="text"
//           placeholder="Ask about your uploaded documents..."
//           style={{
//             flex: 1,
//             padding: "12px 16px",
//             borderRadius: "24px",
//             border: "1px solid #B20F38",
//             outline: "none",
//             fontSize: "1rem",
//           }}
//         />
//         <span style={{ color: "#555", fontSize: "0.875rem" }}>
//           {totalFiles} document{totalFiles !== 1 ? "s" : ""}
//         </span>
//         <button
//           style={{
//             width: "56px",
//             height: "56px",
//             borderRadius: "16px",
//             background: "linear-gradient(to right, #B20F38, #8A0C2D)",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             border: "none",
//             cursor: "pointer",
//           }}
//         >
//           <Send size={20} color="white" />
//         </button>
//       </div>
//     </div>
//   );
// }
