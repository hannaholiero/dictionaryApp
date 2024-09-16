// Visar detaljerad information om ett ord, inklusive uttal, betydelser och ljud.
// Hanterar visning av favoritikoner och ger möjlighet att expandera eller kollapsa texten.

import React, { useState, useRef, useEffect } from "react";
import WordHeader from "./WordHeader";
import WordMeaning from "./WordMeaning";
import WordAudio from "./WordAudio";
import { Word } from "../../constants/types";

interface WordCardProps {
  wordData: Word;
  onAddFavorite: () => void;
  onRemoveFavorite: () => void;
  isFavorite: boolean;
}

const WordCard: React.FC<WordCardProps> = ({
  wordData,
  onAddFavorite,
  onRemoveFavorite,
  isFavorite,
}) => {
  const [isExpanded, setIsExpanded] = useState(false); // Hanterar om texten är utökad eller inte
  const [showExpandButton, setShowExpandButton] = useState(false); // Hanterar visningen av expand-knappen
  const contentRef = useRef<HTMLDivElement>(null);

  // Kontrollera om expand-knappen ska visas baserat på innehållshöjden
  useEffect(() => {
    if (contentRef.current) {
      setShowExpandButton(contentRef.current.scrollHeight > 120); // Visar knappen om innehållet är för långt
    }
  }, [wordData]);

  // Återställ expanderat tillstånd vid byte av data
  useEffect(() => {
    setIsExpanded(false);
  }, [wordData]);

  // Hanterar klick på expand-knappen
  const toggleExpand = () => {
    if (showExpandButton) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div
      data-testid="search-result"
      className={`relative mb-8 rounded-lg border border-customDark bg-white p-6 shadow-lg transition-all duration-300 dark:border-customYellow dark:bg-customDark ${
        isExpanded ? "max-h-full" : "max-h-68 overflow-hidden"
      }`}
    >
      <WordHeader
        word={wordData.word}
        phonetic={wordData.phonetic}
        onAddFavorite={onAddFavorite}
        onRemoveFavorite={onRemoveFavorite}
        isFavorite={isFavorite}
      />

      <div className="mb-4 flex gap-2">
        {wordData.phonetics.map(
          (phonetic, index) =>
            phonetic.audio && <WordAudio key={index} audio={phonetic.audio} />,
        )}
      </div>

      <div
        ref={contentRef}
        className={`mt-4 ${isExpanded ? "" : "line-clamp-2"} transition-all duration-300`}
      >
        {wordData.meanings.map((meaning, index) => (
          <WordMeaning key={index} meaning={meaning} />
        ))}
      </div>

      {/* Expand-knapp visas bara om innehållet är för långt */}
      {showExpandButton && (
        <button
          className="absolute bottom-2 right-2 p-2 text-customDark dark:text-customYellow"
          onClick={toggleExpand}
          aria-label="Expand or collapse"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={`${
                isExpanded
                  ? "M15.75 9L12 5.25 8.25 9m7.5 6L12 18.75 8.25 15"
                  : "M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
              }`}
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default WordCard;
