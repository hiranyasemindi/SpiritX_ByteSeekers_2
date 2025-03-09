import React, { useState } from "react";
import UserChatbot from "../pages/UserChatbot";
import Lottie from "lottie-react";
import lottie1 from "../images/bot.json";

const FloatingChatButton = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="fixed flex bottom-4 right-4 z-50">
      <div className="flex flex-col md:flex-row justify-center items-center cursor-pointer"
          onClick={toggleChat}
      >
        <div className="w-32 h-32 flex justify-items-start">
          <Lottie animationData={lottie1} loop={true} width={100} />
        </div>
        <button
          className="bg-primary text-white p-3 rounded-full shadow-lg transition-all duration-300 flex items-center translate-x-0 md:-translate-x-4 md:translate-y-0 -translate-y-6 hover:scale-105 hover:bg-primary-dark"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          <span>
            <span>Chat with </span> <span className="font-bold"> Spiriter</span>
          </span>
        </button>
      </div>
      <div
        className={`fixed bottom-20 right-1 md:right-4 w-[90%] md:w-1/3 h-[500px] bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 ${
          isChatOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <UserChatbot toggleChat={toggleChat}/>
      </div>
    </div>
  );
};

export default FloatingChatButton;