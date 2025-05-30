import OpenAI from 'openai';
import { OPENAI_API_KEY, OPENAI_CONFIG } from '../config/openai';
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions';

// const openai = new OpenAI({
//   apiKey: OPENAI_API_KEY,
//   dangerouslyAllowBrowser: true
// });

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export async function generateAIResponse(messages: Message[], characterDescription: string) {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages,
        characterDescription
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error);
    }

    return data.content;
  } catch (error) {
    console.error('Error generating AI response:', error);
    return "Sorry, I'm having trouble connecting right now. Please try again in a moment.";
  }
} 