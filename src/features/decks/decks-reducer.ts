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

type ActionsType = ReturnType<typeof setDecks> | ReturnType<typeof addDeck>