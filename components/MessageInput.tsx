
import React, { useState, useRef, ChangeEvent, KeyboardEvent } from 'react';

interface MessageInputProps {
    onSendMessage: (text: string) => void;
    isLoading: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, isLoading }) => {
    const [inputValue, setInputValue] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(e.target.value);
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };
    
    const handleSubmit = () => {
        if (inputValue.trim() && !isLoading) {
            onSendMessage(inputValue);
            setInputValue('');
             if (textareaRef.current) {
                textareaRef.current.style.height = 'auto';
            }
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <div className="flex items-start space-x-3 rtl:space-x-reverse">
            <textarea
                ref={textareaRef}
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="اكتب رسالتك هنا..."
                rows={1}
                className="flex-1 bg-gray-800 border border-gray-600 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none max-h-40"
                disabled={isLoading}
            />
            <button
                onClick={handleSubmit}
                disabled={isLoading || !inputValue.trim()}
                className="bg-cyan-600 text-white rounded-lg p-3 h-[50px] w-[50px] flex items-center justify-center disabled:bg-gray-600 disabled:cursor-not-allowed hover:bg-cyan-500 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400"
                aria-label="إرسال"
            >
                {isLoading ? (
                    <div className="w-5 h-5 border-t-2 border-white border-solid rounded-full animate-spin"></div>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transform rotate-180" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                )}
            </button>
        </div>
    );
};

export default MessageInput;
