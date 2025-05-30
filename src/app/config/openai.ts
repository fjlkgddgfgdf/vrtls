export const OPENAI_CONFIG = {
   model: 'gpt-3.5-turbo',
   temperature: 0.7,
   max_tokens: 150,
   presence_penalty: 0.6,
   frequency_penalty: 0.5
};

export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
