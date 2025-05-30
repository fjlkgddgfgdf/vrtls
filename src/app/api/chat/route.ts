import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
   apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY
});

export async function POST(req: Request) {
   try {
      const { messages, characterDescription } = await req.json();

      const systemPrompt = `You are a virtual companion with the following characteristics: ${characterDescription}

Key guidelines:
- Stay in character at all times
- Be friendly, engaging, and show genuine interest
- Keep responses concise (2-3 sentences)
- Use emojis occasionally to express emotions
- Never break character or mention being an AI
- Maintain a flirty but respectful tone
- Reference your traits and background naturally`;

      const formattedMessages = [
         { role: 'system', content: systemPrompt },
         ...messages.map((msg: any) => ({
            role: msg.role === 'user' ? 'user' : 'assistant',
            content: msg.content
         }))
      ];

      const completion = await openai.chat.completions.create({
         model: 'gpt-3.5-turbo',
         messages: formattedMessages,
         temperature: 0.7,
         max_tokens: 150,
         presence_penalty: 0.6,
         frequency_penalty: 0.5
      });

      const responseContent = completion.choices[0]?.message?.content;

      if (!responseContent) {
         throw new Error('No response from OpenAI');
      }

      return NextResponse.json({ content: responseContent });
   } catch (error) {
      console.error('Error in chat API:', error);
      return NextResponse.json(
         {
            error: "Sorry, I'm having trouble connecting right now. Please try again in a moment."
         },
         { status: 500 }
      );
   }
}
