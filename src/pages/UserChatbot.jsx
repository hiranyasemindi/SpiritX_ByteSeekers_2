import React, { useState, useEffect, useRef } from 'react';
import { fetchPlayerDatabase, getGPTResponse } from '../utils/chatbotUtils';

const UserChatbot = ({ toggleChat }) => {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const chatContainerRef = useRef(null);
    const [playerDatabase, setPlayerDatabase] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchPlayerDatabase(setPlayerDatabase, setMessages);
    }, []);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = async () => {
        if (inputText.trim() === '') return;

        const options = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
        const currentTime = new Date().toLocaleTimeString([], options);

        const userMessage = {
            sender: 'user',
            message: inputText,
            time: currentTime,
        };
        setMessages([...messages, userMessage]);
        setInputText('');

        setLoading(true);

        try {
            const aiResponse = await getGPTResponse(inputText, playerDatabase);

            const aiMessage = {
                sender: 'AI',
                message: aiResponse,
                time: currentTime,
            };

            setMessages((prevMessages) => [...prevMessages, aiMessage]);
        } catch (error) {
            console.error('Error fetching AI response:', error);
            const errorMessage = {
                sender: 'AI',
                message: 'Sorry, something went wrong. Please try again.',
                time: currentTime,
            };
            setMessages((prevMessages) => [...prevMessages, errorMessage]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full bg-gray-100">
            <div className="bg-white text-black p-4 text-center shadow-lg relative">
                <h1 className="text-2xl font-extrabold">Cricket Team Chatbot</h1>
                <button
                    onClick={toggleChat}
                    className="absolute top-3 right-4 p-1 hover:bg-gray-200 rounded-full transition-colors duration-200"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
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
            <div
                ref={chatContainerRef}
                className="flex-1 p-4 overflow-y-auto flex flex-col"
                style={{ maxHeight: 'calc(100vh - 200px)' }}
            >
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4 transition-opacity duration-500`}
                    >
                        <div
                            className={`relative max-w-[90%] p-3 text-gray-800 
                                ${msg.sender === 'user'
                                    ? 'bg-white rounded-[15px] rounded-br-none'
                                    : 'bg-secondary rounded-[15px] rounded-bl-none'}
                            `}
                        >
                            <p className="text-md pb-2">{msg.message}</p>
                            <p className="text-xs text-right mt-1 opacity-50">{msg.time}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="sticky bottom-0 p-4 backdrop-blur-lg rounded-lg bg-white/30 border-t border-gray-200/50 shadow-lg">
                <div className="flex items-center">
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Ask about cricket team selection..."
                        className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary/50 bg-white/50 backdrop-blur-sm"
                        disabled={loading}
                    />
                    <button
                        onClick={handleSendMessage}
                        className="ml-2 p-2 bg-primary/90 text-white text-bold rounded-lg hover:bg-primary focus:outline-none backdrop-blur-sm flex items-center justify-center"
                        disabled={loading}
                    >
                        {loading ? (
                            <svg
                                className="animate-spin h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                        ) : (
                            'Send'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserChatbot;