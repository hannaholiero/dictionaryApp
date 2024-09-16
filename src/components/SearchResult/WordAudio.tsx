// Komponent för att spela upp ljud för ordets uttal.
// Skapar och spelar upp ett ljudobjekt när knappen trycks.

import React from "react";

interface WordAudioProps {
  audio?: string; // URL till ljudfilen för uttal
}

const WordAudio: React.FC<WordAudioProps> = ({ audio }) => {
  // Funktion för att spela upp ljudet om det finns en ljudfil
  const playAudio = () => {
    if (audio) {
      const audioElement = new Audio(audio);
      audioElement
        .play()
        .catch((error) => console.error("Error playing audio:", error)); // Hanterar fel vid uppspelning
    }
  };

  return (
    audio && (
      <button
        data-testId="play-audio-button"
        onClick={playAudio}
        className="flex items-center text-customYellow500 transition-colors hover:text-customDark dark:text-customYellow dark:hover:text-customYellow500"
        aria-label="Spela upp uttal"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="mr-2 h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
          />
        </svg>
        <span className="text-sm">Spela upp uttal</span>
      </button>
    )
  );
};

export default WordAudio;
