import React from "react";
import FavoriteIcon from "../Favorites/FavoriteIcon";

// Visar ordets rubrik med uttal och favoritfunktionalitet
// Hanterar lägg till/ta bort från favoriter och visar ordets namn och fonetik

interface WordHeaderProps {
  word: string;
  phonetic?: string;
  onAddFavorite: () => void;
  onRemoveFavorite: () => void;
  isFavorite: boolean; // Skicka in isFavorite som prop
}

const WordHeader: React.FC<WordHeaderProps> = ({
  word,
  phonetic,
  onAddFavorite,
  onRemoveFavorite,
  isFavorite,
}) => {
  // Uppdatera favorittillståndet när knappen klickas
  const handleToggleFavorite = () => {
    if (isFavorite) {
      onRemoveFavorite();
    } else {
      onAddFavorite();
    }
  };

  return (
    <div className="relative mb-4 flex items-center">
      <FavoriteIcon
        isFavorite={isFavorite}
        onToggleFavorite={handleToggleFavorite}
      />
      <div className="flex flex-1 justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-customDark dark:text-customYellow">
            {word}
          </h2>
          {phonetic && (
            <p className="text-lg text-opacity-75 dark:text-opacity-75">
              {phonetic}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WordHeader;
