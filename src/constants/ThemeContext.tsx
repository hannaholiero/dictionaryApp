import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const storedTheme = sessionStorage.getItem('theme');
      return storedTheme === 'dark' ? 'dark' : 'light';
    } catch (error) {
      console.error('Failed to retrieve theme from sessionStorage:', error);
      return 'light';
    }
  });

  useEffect(() => {
    const rootElement = document.documentElement;

    // Rensa tidigare tema och sätt det aktuella temat
    rootElement.classList.remove('light', 'dark');
    rootElement.classList.add(theme);

    try {
      sessionStorage.setItem('theme', theme);
    } catch (error) {
      console.error('Failed to save theme to sessionStorage:', error);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div
        data-testid="root-context"
        className={`min-h-screen transition-colors duration-300 ${
          theme === 'light'
            ? 'bg-customYellow text-sidebarTextLight'
            : 'bg-customDark text-sidebarTextDark'
        }`}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
