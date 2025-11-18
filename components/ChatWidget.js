'use client';

import { useChat } from '@ai-sdk/react';
import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

export default function Chat() {
  const [isOpen, setIsOpen] = useState(false); 
  const [input, setInput] = useState('');
  const { messages, sendMessage, status } = useChat();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage({ text: input });
    setInput('');
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end font-sans">
      
      {isOpen && (
        <div className="mb-4 w-[350px] h-[500px] bg-white border border-gray-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-2 fade-in-20 duration-300">
          
          <div className="bg-slate-900 p-4 flex justify-between items-center shadow-md">
            <div className="flex items-center gap-2 text-white">
              <div className="bg-blue-600/20 p-1.5 rounded-full">
                <Bot size={30} className="text-blue-400" />
              </div>
              <div className="flex flex-col leading-tight">
                <h3 className="font-bold text-sm text-white">Deepak&apos;s Assistant</h3>
                <p className="text-[10px] text-gray-400">Ask about my resume</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 text-center space-y-2">
                <Bot size={32} className="opacity-20" />
                <p className="text-sm">Say &quot;Hi&quot; to start chatting!</p>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-2 items-end ${
                  message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.role === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-300 text-slate-700'
                }`}>
                  {message.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                </div>

                <div
                  className={`px-3 py-2 rounded-2xl text-sm max-w-[80%] shadow-sm whitespace-pre-wrap break-words ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-none'
                      : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none'
                  }`}
                >
                  {message.parts.map((part, i) => {
                    if (part.type === 'text') {
                      return <span key={`${message.id}-${i}`}>{part.text}</span>;
                    }
                    return null;
                  })}
                </div>
              </div>
            ))}

            {status === 'streaming' && (
               <div className="flex items-center gap-2 text-xs text-gray-400 ml-8">
                 <span>Deepak&apos;s AI is thinking...</span>
               </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100">
            <div className="relative flex items-center">
              <input
                className="w-full bg-slate-100 text-gray-800 text-sm rounded-full pl-4 pr-10 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white transition-all border border-transparent"
                value={input}
                onChange={(e) => setInput(e.currentTarget.value)}
                placeholder="Type a message..."
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="absolute right-1.5 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={14} />
              </button>
            </div>
          </form>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-4 rounded-full shadow-xl transition-all duration-300 transform hover:scale-105 ${
          isOpen ? 'bg-slate-800 rotate-90' : 'bg-blue-600'
        } text-white`}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

    </div>
  );
}