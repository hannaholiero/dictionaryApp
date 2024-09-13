import React from 'react';
import FavoriteCard from './FavoriteCard';
import { Word } from '../../constants/types';

// Komponent för att visa en lista med favoritord.
// Visar meddelande om inga favoriter finns och renderar en lista med favoritkort om det finns några.

interface FavoriteListProps {
  favorites: Word[];
  onRemoveFavorite: (word: string) => void;
  onWordClick: (word: Word) => void;
}

const FavoriteList: React.FC<FavoriteListProps> = ({
  favorites,
  onRemoveFavorite,
  onWordClick,
}) => {
  return (
    <div
      data-testid="favorites-list"
      className="rounded-lg border border-customDark bg-white p-4 text-black shadow-lg dark:border-none dark:bg-customDark dark:text-customYellow"
    >
      <h3 className="mb-4 text-center text-2xl font-bold">Favoritord</h3>
      {favorites.length === 0 ? (
        <p className="text-center">Inga favoriter ännu.</p>
      ) : (
        favorites.map((word, index) => (
          <FavoriteCard
            key={index}
            word={word}
            onRemove={() => onRemoveFavorite(word.word)}
            onClick={() => onWordClick(word)}
          />
        ))
      )}
    </div>
  );
};

export default FavoriteList;
