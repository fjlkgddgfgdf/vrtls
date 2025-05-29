import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { characterDetails } from '../..//data/characters';
import ChatPage from '../../..//components/ChatPage';

export async function generateStaticParams() {
   return characterDetails.map((character) => ({
      character: character.id
   }));
}

export async function generateMetadata({
   params
}: {
   params: { character: string };
}): Promise<Metadata> {
   const character = characterDetails.find((c) => c.id === params.character);
   if (!character) {
      return {
         title: 'Character Not Found'
      };
   }

   return {
      title: `Chat with ${character.name}`,
      description: character.description
   };
}

export default function Page({ params }: { params: { character: string } }) {
   const character = characterDetails.find((c) => c.id === params.character);

   if (!character) {
      notFound();
   }

   return <ChatPage character={character} />;
}
