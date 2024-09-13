import { Switch } from '@headlessui/react';
import { useTheme } from '../constants/ThemeContext';

// ThemeSwitch-komponenten låter användaren växla mellan ljus och mörkt tema
const ThemeSwitch: React.FC = () => {
  // Hämtar aktuell tema och funktion för att byta tema från ThemeContext
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === 'dark'; // Kollar om det aktuella temat är mörkt

  return (
    <div className="flex flex-col items-center">
      {/* Visar text för nuvarande tema */}
      <span
        className="mb-1 text-sm transition-colors duration-300"
        style={{ color: `var(--accent-color)` }}
      >
        {isDarkMode ? 'Dark Mode' : 'Light Mode'}
      </span>

      {/* Växlingsknapp för att byta mellan ljus och mörkt tema */}
      <Switch
        checked={isDarkMode} // Kontrollerar om switchen är aktiverad baserat på det nuvarande temat
        onChange={toggleTheme} // Byter tema när användaren klickar på switchen
        className={`group relative flex h-7 w-14 cursor-pointer rounded-full p-1 transition-colors duration-200 ease-in-out focus:outline-none ${
          isDarkMode ? 'bg-yellow-400' : 'bg-customDark' // Ändrar switchens bakgrundsfärg beroende på tema
        }`}
      >
        {/* Själva cirkeln som rör sig när användaren klickar på switchen */}
        <span
          aria-hidden="true"
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
            isDarkMode ? 'translate-x-7' : 'translate-x-0' // Flyttar cirkeln beroende på tema
          }`}
        />
      </Switch>
    </div>
  );
};

export default ThemeSwitch;
