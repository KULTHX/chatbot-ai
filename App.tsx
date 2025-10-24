import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Message } from './types';
import { streamChatResponse } from './services/geminiService';
import ChatHistory from './components/ChatHistory';
import MessageInput from './components/MessageInput';

const App: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const modelMessageRef = useRef<Message | null>(null);

    const handleSendMessage = useCallback(async (text: string) => {
        if (!text.trim()) return;

        const userMessage: Message = {
            id: `user-${Date.now()}`,
            text,
            sender: 'user',
        };
        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);
        setError(null);

        modelMessageRef.current = {
            id: `model-${Date.now()}`,
            text: '',
            sender: 'model',
        };

        setMessages(prev => [...prev, modelMessageRef.current as Message]);

        // FIX: Swapped arguments to match the `streamChatResponse` function signature.
        await streamChatResponse(text, {
            onChunk: (chunk) => {
                if (modelMessageRef.current) {
                    modelMessageRef.current.text += chunk;
                    setMessages(prev => {
                        const newMessages = [...prev];
                        const index = newMessages.findIndex(m => m.id === modelMessageRef.current!.id);
                        if (index !== -1) {
                            newMessages[index] = { ...modelMessageRef.current };
                        }
                        return newMessages;
                    });
                }
            },
            onComplete: () => {
                setIsLoading(false);
                modelMessageRef.current = null;
            },
            onError: (err) => {
                setError(`خطأ في الاتصال بالـ API: ${err.message}`);
                setIsLoading(false);
                 setMessages(prev => prev.filter(m => m.id !== modelMessageRef.current?.id));
                modelMessageRef.current = null;
            }
        });
    }, []);
    

    return (
        <div className="flex flex-col h-screen bg-gray-900 text-white font-sans">
            <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 p-4 shadow-lg sticky top-0 z-10">
                <h1 className="text-xl sm:text-2xl font-bold text-center text-cyan-400">
                    Gemini AI Chat | دردشة Gemini
                </h1>
            </header>
            
            <ChatHistory messages={messages} />

            <footer className="p-4 bg-gray-900/80 backdrop-blur-sm sticky bottom-0 border-t border-gray-700">
                {error && (
                    <div className="text-center text-red-400 mb-2 bg-red-900/30 p-2 rounded-md">
                        {error}
                    </div>
                )}
                <MessageInput
                    onSendMessage={handleSendMessage}
                    isLoading={isLoading}
                />
            </footer>
        </div>
    );
};

export default App;