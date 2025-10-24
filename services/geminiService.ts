
import { GoogleGenAI, Chat } from "@google/genai";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set. Please set it in your hosting provider (e.g., Vercel).");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const chat: Chat = ai.chats.create({
  model: 'gemini-2.5-flash',
  config: {
    systemInstruction: 'You are a helpful assistant. Be concise and friendly. If the user speaks in Arabic, you MUST respond in Arabic.',
  },
});

interface StreamCallbacks {
    onChunk: (chunk: string) => void;
    onComplete: () => void;
    onError: (error: Error) => void;
}

export const streamChatResponse = async (message: string, callbacks: StreamCallbacks) => {
    try {
        const result = await chat.sendMessageStream({ message });
        for await (const chunk of result) {
            callbacks.onChunk(chunk.text);
        }
        callbacks.onComplete();
    } catch (error) {
        console.error("Gemini API error:", error);
        callbacks.onError(error instanceof Error ? error : new Error('An unknown error occurred.'));
    }
};
