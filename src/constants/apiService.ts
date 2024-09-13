// apiService.ts
import axios from 'axios';
import { Word } from './types';

export const fetchWordData = async (query: string): Promise<Word | null> => {
  try {
    const response = await axios.get<Word[]>(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${query}`,
      { validateStatus: (status: number) => status === 200 || status === 404 },
    );
    if (response.data && response.data.length > 0) {
      return response.data[0];
    }

    return null; // Returnera null om inget ord hittas
  } catch (error) {
    console.error('Error fetching word data:', error);
    throw new Error('Failed to fetch data'); // Specifik felhantering
  }
};
