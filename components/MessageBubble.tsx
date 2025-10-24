
import React from 'react';
import { Message } from '../types';

interface MessageBubbleProps {
    message: Message;
}

const UserIcon: React.FC = () => (
    <div className="w-8 h-8 rounded-full bg-cyan-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
        أنت
    </div>
);

const ModelIcon: React.FC = () => (
    <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.5a.75.75 0 01.75.75v1.652a8.006 8.006 0 015.42 5.42h1.653a.75.75 0 010 1.5h-1.653a8.006 8.006 0 01-5.42 5.42v1.653a.75.75 0 01-1.5 0v-1.653a8.006 8.006 0 01-5.42-5.42H3.75a.75.75 0 010-1.5h1.653a8.006 8.006 0 015.42-5.42V3.25A.75.75 0 0112 2.5zM12 8a4 4 0 100 8 4 4 0 000-8z"/>
        </svg>
    </div>
);

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
    const isUser = message.sender === 'user';

    const bubbleClasses = isUser
        ? 'bg-cyan-700 text-white rounded-l-2xl rounded-tr-2xl'
        : 'bg-gray-700 text-gray-200 rounded-r-2xl rounded-tl-2xl';

    const containerClasses = isUser
        ? 'flex items-start gap-3 justify-end'
        : 'flex items-start gap-3 justify-start';

    return (
        <div className={containerClasses}>
            {!isUser && <ModelIcon />}
            <div className={`p-4 max-w-sm md:max-w-md lg:max-w-lg ${bubbleClasses}`}>
                 <p className="whitespace-pre-wrap">{message.text || '...'}</p>
            </div>
            {isUser && <UserIcon />}
        </div>
    );
};

export default MessageBubble;
