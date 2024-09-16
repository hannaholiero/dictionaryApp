import { useState } from "react";
import FavoriteList from "./Favorites/FavoriteList";
import { Word } from "../constants/types";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline";

// Definierar de props som Sidebar-komponenten tar emot
interface SidebarProps {
  favorites: Word[]; // Array av favoritord
  onRemoveFavorite: (word: string) => void; // Funktion för att ta bort ett ord från favoriter
  onWordClick: (word: Word) => void; // Funktion som triggas när användaren klickar på ett ord i favoriter
}

// Sidebar-komponenten hanterar sidpanelen som visar favoritord
const Sidebar: React.FC<SidebarProps> = ({
  favorites,
  onRemoveFavorite,
  onWordClick,
}) => {
  const [isOpen, setIsOpen] = useState(false); // State för att hantera om sidopanelen är öppen eller stängd

  return (
    <>
      {/* Mobilknapp för att öppna sidopanelen */}
      <button
        type="button"
        onClick={() => setIsOpen(true)} // Öppnar sidopanelen
        className="fixed right-4 top-[120px] z-20 rounded-full bg-customDark p-2 text-white shadow-md dark:bg-amber-400 dark:text-customDark lg:hidden"
      >
        <Bars3Icon className="h-6 w-6" />
        <span className="sr-only">Open Sidebar</span>{" "}
        {/* Tillgänglighetsbeskrivning */}
      </button>

      {/* Sidopanelen */}
      <aside
        data-testid="sidebar"
        className={`lg:fixed lg:right-0 lg:top-[120px] lg:h-[calc(100vh-120px)] lg:w-64 lg:p-4 ${
          isOpen ? "fixed inset-y-0 right-0 z-20 w-64 p-4" : "hidden" // Hanterar visning och position av sidopanelen
        } transform transition-transform duration-300 ease-in-out lg:block`}
      >
        {/* Mobilknapp för att stänga sidopanelen */}
        <button
          type="button"
          onClick={() => setIsOpen(false)} // Stänger sidopanelen
          className="absolute right-2 top-2 rounded-full bg-customYellow200 p-2 text-customDark shadow-md lg:hidden"
        >
          <XMarkIcon className="h-5 w-5" />
          <span className="sr-only">Close Sidebar</span>{" "}
          {/* Tillgänglighetsbeskrivning */}
        </button>

        {/* Visar listan av favoritord */}
        <FavoriteList
          favorites={favorites}
          onWordClick={onWordClick} // När ett ord i listan klickas, visas det
          onRemoveFavorite={onRemoveFavorite} // Tar bort ett ord från favoriter när krysset klickas
        />
      </aside>
    </>
  );
};

export default Sidebar;
