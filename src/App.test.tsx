// App.test.tsx
import { render, screen, within, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { setupServer } from 'msw/node';
import { HttpResponse, http } from 'msw';
import { vi } from 'vitest';

//Mock data
const mockWord = [
  {
    word: 'example',
    phonetic: '/ɪɡˈzɑːmpəl/',
    phonetics: [
      {
        text: '/ɪɡˈzɑːmpəl/',
        audio: 'https://audio.example.com/example.mp3',
      },
    ],
    meanings: [
      {
        partOfSpeech: 'noun',
        definitions: [
          {
            definition:
              'Something that is representative of all such things in a group',
            example: '',
          },
        ],
      },
    ],
  },
];

// Setup MSW server för att hantera API-anrop
const server = setupServer(
  http.get('https://api.dictionaryapi.dev/api/v2/entries/en/example', () => {
    return HttpResponse.json(mockWord);
  }),
  http.get('https://api.dictionaryapi.dev/api/v2/entries/en/hittepåord', () => {
    return HttpResponse.json(
      {
        title: 'No Definitions Found',
        message:
          "Sorry pal, we couldn't find definitions for the word you were looking for.",
        resolution:
          'You can try the search again at later time or head to the web instead.',
      },
      { status: 404 },
    );
  }),
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => {
  cleanup();
  server.resetHandlers();
});

beforeEach(() => {
  // Mocka sessionStorage
  const mockStorage: Record<string, string> = {};
  Storage.prototype.setItem = vi.fn((key, value) => {
    mockStorage[key] = value;
  });
  Storage.prototype.getItem = vi.fn((key) => mockStorage[key] || null);
  Storage.prototype.removeItem = vi.fn((key) => {
    delete mockStorage[key];
  });
  Storage.prototype.clear = vi.fn(() => {
    Object.keys(mockStorage).forEach((key) => delete mockStorage[key]);
  });
});

describe('show fields', () => {
  it('should render the header', () => {
    render(<App />);
    const headerTitle = screen.getByText(/HANNAHS DICTIONARY/i);
    expect(headerTitle).toBeInTheDocument();
  });

  // Test för att kontrollera att sökfältet renderas
  it('should render SearchField', () => {
    render(<App />);
    const searchInput = screen.getByPlaceholderText(/sök ord.../i);
    expect(searchInput).toBeInTheDocument();
  });
});

describe('search', () => {
  // Test för att kontrollera att sökfältet uppdateras när användaren skriver
  it('should update search field when user types', async () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/sök ord.../i);
    await userEvent.type(input, 'testword');
    expect(input).toHaveValue('testword');
  });
  // Test för att visa felmeddelande vid tomt sökfält
  it('should show error message when search is made with an empty input', async () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/sök ord.../i);
    await userEvent.type(input, '{Enter}');
    expect(await screen.findByText(/Sökfältet tomt/i)).toBeInTheDocument();
  });
  // Test för att visa felmeddelande när ordet inte finns
  it("should show error message when word doesn't exist", async () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/sök ord.../i);
    await userEvent.type(input, 'hittepåord{Enter}');
    expect(await screen.findByText(/Inga ord hittades/i)).toBeInTheDocument();
  });

  // Test för att hämta och visa data för ett sökt ord
  it('should fetch and display word data when a search is made', async () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/sök ord.../i);
    await userEvent.type(input, 'example{Enter}');
    expect(await screen.findByText('example')).toBeInTheDocument();
    expect(
      await screen.findByText(
        'Something that is representative of all such things in a group',
      ),
    ).toBeInTheDocument();
  });
});

describe('theme', () => {
  // Test för att kontrollera att temat byts vid klick på ThemeSwitch
  it('should toggle theme when ThemeSwitch is clicked', async () => {
    render(<App />);
    const themeSwitch = screen.getByRole('switch');
    expect(themeSwitch).toBeInTheDocument();
    await userEvent.click(themeSwitch);
    const mainContainer = screen.getByTestId('root-context');
    expect(mainContainer).toHaveClass('bg-customDark');
  });
});

describe('Favorites functionality', () => {
  // Test för att kontrollera att favoriter komponenten renderas
  it('should render favorite component', () => {
    render(<App />);
    const favoriteHeading = screen.getByText(/favoritord/i);
    expect(favoriteHeading).toBeInTheDocument();
  });
  // Test för att lägga till ord i favoriter
  it('should add word to favorites when the heart is clicked', async () => {
    render(<App />);
    await userEvent.type(
      screen.getByPlaceholderText(/sök ord.../i),
      'example{Enter}',
    );
    await userEvent.click(await screen.findByTestId('add-favorite-icon'));
    const favoriteList = await screen.findByTestId('favorites-list');
    expect(within(favoriteList).getByText('example')).toBeInTheDocument();
  });

  // Test för att ta bort ord från favoriter genom krysset i favoritlistan
  it('should remove word from favorites when the remove button is clicked', async () => {
    render(<App />);
    await userEvent.type(
      screen.getByPlaceholderText(/sök ord.../i),
      'example{Enter}',
    );
    await userEvent.click(await screen.findByTestId('add-favorite-icon'));
    const favoriteList = await screen.findByTestId('favorites-list');
    expect(within(favoriteList).getByText('example')).toBeInTheDocument();
    const removeButton = within(favoriteList).getByRole('button', {
      name: /ta bort från favoriter/i,
    });
    await userEvent.click(removeButton);
    expect(within(favoriteList).queryByText('example')).not.toBeInTheDocument();
  });
});

describe('Search result', () => {
  it('should find the play-audio-button(text)', async () => {
    render(<App />);

    // Hitta sökfältet och skriv in ett ord
    const input = screen.getByPlaceholderText(/sök ord.../i);
    await userEvent.type(input, 'example{Enter}');

    // Vänta på att data ska laddas och ljudikonen ska visas
    const playButton = await screen.findByTestId('play-audio-button');
    expect(playButton).toBeInTheDocument();
  });
});
