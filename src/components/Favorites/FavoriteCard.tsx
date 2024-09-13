// Komponent för att visa ett favoritkort med ordinformation och en knapp för att ta bort det från favoriter.

import { Word } from '../../constants/types';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface FavoriteCardProps {
  word: Word; // Ordet som visas i favoritkortet
  onRemove: () => void; // Funktion som körs när man klickar på ta bort-knappen
  onClick: () => void; // Funktion som körs när man klickar på själva kortet
}

const FavoriteCard: React.FC<FavoriteCardProps> = ({
  word,
  onRemove,
  onClick,
}) => {
  return (
    <div
      className="my-2 flex cursor-pointer items-center justify-between rounded-lg border border-customDark bg-customYellow p-2 text-customDark transition-colors hover:bg-customYellow200 dark:border-stone-50 dark:bg-customDark dark:text-stone-50 dark:hover:bg-amber-500"
      onClick={onClick} // Hanterar klick på hela kortet, för att visa ordet
    >
      <div className="flex flex-col">
        <span className="font-semibold">{word.word}</span>
        {word.phonetic && (
          <span className="text-sm text-customDark text-opacity-50 dark:text-stone-50">
            {word.phonetic}
          </span>
        )}
      </div>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation(); // Förhindrar att kortets onClick körs när man klickar på krysset
          onRemove(); // Kör funktionen för att ta bort ordet från favoriter
        }}
        className="p-1 text-red-500 transition hover:text-red-700"
        aria-label="Ta bort från favoriter"
      >
        <XMarkIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default FavoriteCard;
