import React from 'react';

// Visar ordets betydelser, inklusive ordklass, definitioner och exempel

interface WordMeaningProps {
  meaning: {
    partOfSpeech: string;
    definitions: Array<{
      definition: string;
      example?: string;
    }>;
  };
}

const WordMeaning: React.FC<WordMeaningProps> = ({ meaning }) => {
  return (
    <div className="mt-4 text-left text-customDark dark:text-customYellow">
      {/* Visar ordklass, t.ex. substantiv, verb */}
      <p className="text-lg font-semibold">{meaning.partOfSpeech}</p>
      {meaning.definitions.map((def, index) => (
        <div key={index} className="mt-2">
          {/* Visar definitionen av ordet */}
          <p>{def.definition}</p>
          {def.example && (
            // Visar exempelmening om det finns
            <p className="italic text-opacity-50 dark:text-opacity-55">
              Ex: {def.example}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default WordMeaning;
