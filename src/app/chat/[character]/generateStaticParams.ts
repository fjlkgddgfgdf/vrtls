import { characterDetails } from '../../data/characters';

export async function generateStaticParams() {
  return characterDetails.map((character) => ({
    character: character.id,
  }));
} 