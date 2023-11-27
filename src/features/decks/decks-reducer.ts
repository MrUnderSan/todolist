import { Deck } from './decks-api.ts'

const initialState = {
  decks: [] as Deck[], // todo: add type
  searchParams: {
    name: '',
  },
}

type DecksState = typeof initialState

export const decksReducer = (state: DecksState = initialState, action: ActionsType): DecksState => {
  switch (action.type) {
    case 'DECKS/SET-DECKS':
      return {...state, decks: action.decks}
    case 'DECKS/ADD-DECKS':
      return {...state, decks: [action.deck, ...state.decks]}
    case 'DECKS/REMOVE-DECK':
      return {...state, decks: state.decks.filter(d => d.id !== action.id)}
    case 'DECKS/UPDATE-DECK':
      return {...state, decks: state.decks.map(d => d.id === action.deck.id ? action.deck : d)}
    default:
      return state
  }
}

export const setDecks = (decks: Deck[]) => ({
  type: 'DECKS/SET-DECKS',
  decks
} as const)

export const addDeck = (deck: Deck) => ({
  type: 'DECKS/ADD-DECKS',
  deck
} as const)

export const removeDeck = (id: string) => ({
  type: 'DECKS/REMOVE-DECK',
  id
} as const)

export const updateDeck = (deck: Deck) => ({
  type: 'DECKS/UPDATE-DECK',
  deck
} as const)

type ActionsType =
  | ReturnType<typeof setDecks>
  | ReturnType<typeof addDeck>
  | ReturnType<typeof removeDeck>
  | ReturnType<typeof updateDeck>