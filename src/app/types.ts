export interface Character {
   id: string;
   name: string;
   description: string;
   imageId: string;
   locked: boolean;
}

export interface ChatMessage {
   role: 'user' | 'assistant';
   content: string;
}
