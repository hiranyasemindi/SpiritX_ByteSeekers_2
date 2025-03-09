import React, { useState, useEffect, useRef } from 'react';

const UserChatbot = () => {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const chatContainerRef = useRef(null);

    const handleSendMessage = () => {
        if (inputText.trim() === '') return;

        const userMessage = {
            sender: 'user',
            message: inputText,
            time: new Date().toLocaleTimeString(),
        };
        setMessages([...messages, userMessage]);

        setTimeout(() => {
            const aiMessage = {
                sender: 'AI',
                message: `You said: "${inputText}"`,
                time: new Date().toLocaleTimeString(),
            };
            setMessages((prevMessages) => [...prevMessages, aiMessage]);
        }, 1000);

        setInputText('');
    };
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="flex flex-col h-full bg-gray-100">
            <div className="bg-white text-black p-4 text-center shadow-lg">
                <h1 className="text-2xl font-extrabold">Chatbot</h1>
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
                        placeholder="Type a message..."
                        className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary/50 bg-white/50 backdrop-blur-sm"
                    />
                    <button
                        onClick={handleSendMessage}
                        className="ml-2 p-2 bg-primary/90 text-white text-bold rounded-lg hover:bg-primary focus:outline-none backdrop-blur-sm"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserChatbot;