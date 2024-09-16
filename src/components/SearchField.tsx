import { useState, FormEvent } from "react";

interface SearchFieldProps {
  onSearch: (query: string) => void; // Funktion som triggas när användaren skickar in en sökning
}

// SearchField-komponenten ansvarar för att hantera användarens sökningar
const SearchField: React.FC<SearchFieldProps> = ({ onSearch }) => {
  const [query, setQuery] = useState(""); // State för att hålla koll på vad användaren skriver i sökfältet

  // Hanterar när formuläret skickas in
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault(); // Förhindrar sidan från att laddas om vid formulärskick
    onSearch(query); // Anropar onSearch-funktionen med användarens sökord
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      {/* Inputfält för att skriva in sökord */}
      <input
        type="text"
        value={query} // Kopplar inputfältet till query-staten
        onChange={(e) => setQuery(e.target.value)} // Uppdaterar query-staten när användaren skriver
        className="rounded-lg border px-4 py-2 placeholder-customDark transition-colors duration-300 focus:outline-none dark:bg-customDark dark:placeholder-customYellow"
        placeholder="Sök ord..." // Placholder-text som visas när inputfältet är tomt
      />
      {/* Knapp för att skicka in sökningen */}
      <button
        type="submit"
        className="ml-2 rounded p-2 transition-colors duration-300 hover:bg-customYellow200"
        aria-label="Sök" // Tillgänglighetsbeskrivning för knappen
      >
        {/* Ikon för sökknappen */}
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
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </button>
    </form>
  );
};

export default SearchField;
