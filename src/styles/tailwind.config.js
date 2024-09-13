// tailwind.config.js
import forms from '@tailwindcss/forms';
import lineClamp from '@tailwindcss/line-clamp';

export default {
  content: [
    './index.html', // index.html ligger på roten av projektet
    './src/**/*.{js,ts,jsx,tsx}', // Se till att den söker inom src-mappen
  ],
  darkMode: 'class', // Aktiverar dark mode med klass istället för media queries
  theme: {
    extend: {
      colors: {
        customYellow: '#fffbeb',
        customYellow200: '#fbbf24',
        customYellow500: '#f59e0b',
        customDark: '#422006',
        sidebarLight: '#fffbeb',
        sidebarDark: '#422006',
        sidebarTextLight: '#422006',
        sidebarTextDark: '#f3f4f6',
      },
      backgroundImage: {
        'custom-pattern':
          "url(\"data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fbbf24' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};
