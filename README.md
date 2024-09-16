# Hannah's Dictionary App 📚

**Hannah's Dictionary App** är en responsiv ordboksapp byggd med React, TypeScript och Tailwind CSS. Sök efter ord och få definitioner, uttal och andra detaljer.

## 🚀 Funktioner

- Sök och få detaljerad information om ord.
- Lägg till ord som favoriter.
- Responsiv design med mörkt och ljust läge.

## 🛠️ Tekniker

- **React & TypeScript**: Skalbar frontend.
- **Tailwind CSS**: Snabb och responsiv styling.
- **MSW (Mock Service Worker)**: Mockade API-anrop i tester.
- **React Testing Library & Vitest**: Enhetstester.

## ⚙️ Installation

1. **Kloning av repo**
   ```
   git clone https://github.com/dittanvändarnamn/dictionary-app.git
   cd dictionary-app

2. **Installation av beroenden**
    ```bash
    npm install

3. **Kör applikationen**
     ```bash
     npm start

## 🧪 Testning

För att köra testerna, använd följande kommando:
```bash
npm test
```

API-anrop är mockade för snabba och pålitliga tester.

## 📂 Filstruktur

Projektets mappstruktur ser ut enligt följande:

```plaintext
dictionaryApp/
│
├── node_modules/         # Projektets beroenden
├── public/               # Offentliga filer som index.html
├── src/                  # Källkodsmappen
│   ├── assets/           # Bilder och andra tillgångar
│   ├── components/       # React-komponenter
│   │   ├── Favorites/    # Favoritrelaterade komponenter
│   │   │   ├── FavoriteCard.tsx
│   │   │   ├── FavoriteIcon.tsx
│   │   │   └── FavoriteList.tsx
│   │   ├── SearchResult/ # Sökresultatkomponenter
│   │   │   ├── WordAudio.tsx
│   │   │   ├── WordCard.tsx
│   │   │   ├── WordHeader.tsx
│   │   │   └── WordMeaning.tsx
│   │   ├── Sidebar.tsx   # Sidebar-komponenten
│   │   ├── SearchField.tsx
│   │   ├── ThemeSwitch.tsx
│   │   └── SearchIcon.tsx
│   ├── constants/        # Konstanter och kontext
│   │   ├── apiService.ts
│   │   ├── ThemeContext.tsx
│   │   └── types.ts
│   ├── styles/           # CSS och Tailwind-konfiguration
│   │   ├── tailwind.config.js
│   │   └── index.css
│   ├── App.tsx           # Huvudkomponenten
│   ├── main.tsx          # Inträdespunkt för applikationen
│   └── App.test.tsx      # Testfall för applikationen
│
├── .gitignore            # Filer att ignorera av Git
├── package.json          # Projektets inställningar och beroenden
├── tsconfig.json         # TypeScript-konfiguration
├── vite.config.ts        # Vite-konfiguration
└── README.md             # Dokumentation för projektet
