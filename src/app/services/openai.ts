import OpenAI from 'openai';
import { OPENAI_API_KEY, OPENAI_CONFIG } from '../config/openai';

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

interface Character {
  name: string;
  age: number;
  description: string;
  traits: string[];
}

export async function generateAIResponse(
  character: Character,
  userName: string,
  message: string,
  conversationHistory: { role: 'user' | 'assistant'; content: string }[]
) {
  try {
    const systemPrompt = `You are ${character.name}, a ${character.age}-year-old virtual companion. ${character.description}. Your personality traits are: ${character.traits.join(', ')}. You are chatting with ${userName}.

Key guidelines:
- Stay in character at all times
- Be friendly, engaging, and show genuine interest
- Keep responses concise (2-3 sentences)
- Use emojis occasionally to express emotions
- Never break character or mention being an AI
- Maintain a flirty but respectful tone
- Reference your traits and background naturally
- Address the user by their name occasionally

Current conversation context: You are having a chat with ${userName}.`;

    const response = await openai.chat.completions.create({
      model: OPENAI_CONFIG.model,
      temperature: OPENAI_CONFIG.temperature,
      max_tokens: OPENAI_CONFIG.max_tokens,
      messages: [
        { role: 'system', content: systemPrompt },
        ...conversationHistory,
        { role: 'user', content: message }
      ],
    });

    return response.choices[0]?.message?.content || "I'm not sure how to respond to that.";
  } catch (error) {
    console.error('Error generating AI response:', error);
    return "I'm having trouble responding right now. Could you try again?";
  }
} 