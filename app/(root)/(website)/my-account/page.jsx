"use client"
import React from "react";

/** Chat Panel with 2 useStates (user + other user messages) */
export default function ChatPanel() {
    const [messages, setMessages] = React.useState([
        { type: "received", text: "Hello!", time: "10:01 AM" },
        { type: "sent", text: "Hi! What's up? 😊", time: "10:02 AM" }
    ]);

    const [userMessage, setUserMessage] = React.useState("");
    const [otherMessage, setOtherMessage] = React.useState("");

    const sendUserMessage = () => {
        if (!userMessage.trim()) return;
        const newMsg = {
            type: "sent",
            text: userMessage,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        };
        setMessages((prev) => [...prev, newMsg]);
        setUserMessage("");
    };

    const sendOtherMessage = () => {
        if (!otherMessage.trim()) return;
        const newMsg = {
            type: "received",
            text: otherMessage,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        };
        setMessages((prev) => [...prev, newMsg]);
        setOtherMessage("");
    };

    return (
        <div className="w-full h-screen bg-white flex flex-col border-l border-gray-200">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-300" />
                <div>
                    <h2 className="font-semibold text-gray-800 text-lg">Username</h2>
                    <p className="text-xs text-gray-500">Online</p>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#f5f8fa]">
                {messages.map((msg, index) => (
                    <div key={index} className={msg.type === "sent" ? "flex justify-end" : "flex justify-start"}>
                        <div
                            className={
                                msg.type === "sent"
                                    ? "max-w-xs bg-[#1d9bf0] text-white p-3 rounded-2xl rounded-br-none shadow"
                                    : "max-w-xs bg-gray-200 text-black p-3 rounded-2xl rounded-bl-none shadow"
                            }
                        >
                            <p className="text-sm leading-snug whitespace-pre-line">{msg.text}</p>
                            <p className="text-[10px] text-right mt-1 opacity-60">{msg.time}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* User Input */}
            <div className="p-4 border-t border-gray-200 bg-white flex items-center gap-2">
                <input
                    type="text"
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 bg-gray-100 rounded-full outline-none text-sm"
                />
                <button onClick={sendUserMessage} className="px-5 py-2 bg-[#1d9bf0] text-white rounded-full font-medium shadow">
                    Send
                </button>
            </div>

            {/* Other User Input (Simulation) */}
            <div className="p-4 bg-gray-50 border-t flex items-center gap-2">
                <input
                    type="text"
                    value={otherMessage}
                    onChange={(e) => setOtherMessage(e.target.value)}
                    placeholder="Other user message"
                    className="flex-1 px-4 py-2 bg-gray-100 rounded-full outline-none text-sm"
                />
                <button onClick={sendOtherMessage} className="px-5 py-2 bg-gray-400 text-white rounded-full font-medium shadow">
                    Receive
                </button>
            </div>
        </div>
    );
}
