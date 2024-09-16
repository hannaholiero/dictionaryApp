import { useState, useEffect } from "react";
import SearchField from "./components/SearchField"; // Komponent för sökfältet
import WordCard from "./components/SearchResult/WordCard"; // Komponent som visar information om det hittade ordet
import Sidebar from "./components/Sidebar"; // Komponent för sidopanelen med favoriter
import { Word } from "./constants/types"; // Typdefinitioner för orddata
import { ThemeProvider } from "./constants/ThemeContext"; // Hanterar tema (ljus/mörk) för appen
import ThemeSwitch from "./components/ThemeSwitch"; // Komponent för att byta tema (ljus/mörk)
import { fetchWordData } from "./constants/apiService"; // Funktion för att hämta orddata från API

// Huvudkomponent för applikationen
const App: React.FC = () => {
  // State för orddata, favoriter och felmeddelanden
  const [wordData, setWordData] = useState<Word | null>(null); // State för det sökta ordets data
  const [favorites, setFavorites] = useState<Word[]>(() => {
    // State för favoriter, hämtas från sessionStorage vid sidladdning
    const savedFavorites = sessionStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : []; // Om inga favoriter finns, börja med tom lista
  });
  const [error, setError] = useState(""); // State för felmeddelanden

  // Spara favoriter i sessionStorage varje gång de uppdateras
  useEffect(() => {
    sessionStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Funktion för att hantera sökning av ett ord
  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      // Kontrollera att användaren har skrivit något
      setError("Sökfältet tomt, försök igen!");
      setWordData(null);
      return;
    }

    try {
      const data = await fetchWordData(query); // Anropa API:t för att hämta data för det sökta ordet

      if (data) {
        setWordData(data); // Om data finns, uppdatera state och rensa eventuella felmeddelanden
        setError("");
      } else {
        // Om inget hittas, visa ett felmeddelande
        setError("Inga ord hittades");
        setWordData(null);
      }
    } catch (_) {
      // Fångar fel som kan inträffa vid API-anropet
      setError("Ett fel uppstod, försök igen.");
      setWordData(null);
    }
  };

  // Lägg till ett ord i favoriter om det inte redan finns där
  const addFavorite = (word: Word) => {
    if (!favorites.some((fav) => fav.word === word.word)) {
      setFavorites([...favorites, word]);
    }
  };

  // Ta bort ett ord från favoriter
  const removeFavorite = (word: string) => {
    setFavorites(favorites.filter((fav) => fav.word !== word));
  };

  // Renderar applikationen
  return (
    <ThemeProvider>
      {/* Header med titel och tema-växlare */}
      <header className="flex flex-row items-center justify-between p-8 tracking-widest">
        <h1 className="font-display text-center text-3xl text-yellow-800 transition-colors duration-300 dark:text-yellow-300">
          HANNAHS DICTIONARY
        </h1>
        <ThemeSwitch /> {/* Knapp för att byta tema mellan ljus och mörk */}
      </header>

      <div className="relative flex flex-col items-center">
        <main className="mx-auto flex flex-1 flex-col items-center p-4 lg:max-w-2xl">
          <div className="w-full max-w-lg">
            <SearchField onSearch={handleSearch} />{" "}
            {/* Sökfält för att leta upp ord */}
            {error && <p className="mt-2 text-red-500">{error}</p>}{" "}
            {/* Visar felmeddelande vid behov */}
          </div>

          {/* Visar information om det hittade ordet */}
          {wordData && (
            <div className="mt-4 w-full max-w-lg">
              <WordCard
                wordData={wordData}
                onAddFavorite={() => addFavorite(wordData)}
                onRemoveFavorite={() => removeFavorite(wordData.word)}
                isFavorite={favorites.some((fav) => fav.word === wordData.word)}
              />
            </div>
          )}
        </main>

        {/* Sidopanel med favoritord */}
        <Sidebar
          favorites={favorites}
          onWordClick={(word) => setWordData(word)} // Visar ett ord från favoriter när det klickas
          onRemoveFavorite={removeFavorite} // Tar bort ett ord från favoriter när krysset klickas
        />
      </div>
    </ThemeProvider>
  );
};

export default App;
