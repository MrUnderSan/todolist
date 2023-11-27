import axios from 'axios'

export const instance = axios.create({
  baseURL: 'https://api.flashcards.andrii.es/v1/',
  headers: {
    'x-auth-skip': true,
  },
})

export const decksAPI = {
  fetchDecks() {
    return instance.get<FetchDecksResponse>('decks')
  },
  postDeck(name: string) {
    return instance.post<Deck>('decks', {name})
  },
  deleteDeck(id: string) {
    return instance.delete<Deck>(`decks/${id}`)
  },
  patchDeck(id: string, model: PatchModelType) {
    return instance.patch<Deck>(`decks/${id}`, model)
  }
}

export type PatchModelType = {
  cover?: string
  name?: string
  isPrivate?: boolean
}

export type FetchDecksResponse = {
  items: Deck[];
  pagination: Pagination;
  maxCardsCount: number;
}
export type Author = {
  id: string;
  name: string;
}
export type Deck = {
  author: Author;
  id: string;
  userId: string;
  name: string;
  isPrivate: boolean;
  shots: number;
  cover: string;
  rating: number;
  created: string;
  updated: string;
  cardsCount: number;
}
export type Pagination = {
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  totalItems: number;
}