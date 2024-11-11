import axios from 'axios';
import { ChatSettings } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'https://api.x.ai/v1/chat/completions';
const API_KEY = import.meta.env.VITE_API_KEY;

const getTonePrompt = (tone: ChatSettings['tone']): string => {
  switch (tone) {
    case 'formal':
      return 'Please respond professionally and formally.';
    case 'friendly':
      return 'Please respond in a friendly and casual way.';
    case 'humorous':
      return 'Please respond with humor and wit when appropriate.';
    case 'informative':
      return 'Please provide detailed and informative responses.';
    default:
      return '';
  }
};

interface MessageContext {
  role: string;
  content: string;
}

export const generateAIResponse = async (
  message: string,
  tone: ChatSettings['tone'],
  previousMessages: MessageContext[]
): Promise<string> => {
  try {
    const tonePrompt = getTonePrompt(tone);
    
    const messages = [
      {
        role: 'system',
        content: tonePrompt
      },
      ...previousMessages.slice(-3).map(msg => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content
      })),
      {
        role: 'user',
        content: message
      }
    ];

    const response = await axios.post(
      API_URL,
      {
        messages,
        model: 'grok-beta',
        stream: false,
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        timeout: 30000, // 30 second timeout
      }
    );

    if (!response.data?.choices?.[0]?.message?.content) {
      throw new Error('Invalid response format from AI service');
    }

    return response.data.choices[0].message.content;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 429) {
        throw new Error('Rate limit exceeded. Please try again in a few moments.');
      }
      if (error.code === 'ECONNABORTED') {
        throw new Error('Request timed out. Please try again.');
      }
      throw new Error(`AI service error: ${error.message}`);
    }
    throw new Error('Failed to generate AI response. Please try again later.');
  }
};