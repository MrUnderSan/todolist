import { AppDispatch } from '../../app/store.ts'
import { decksAPI } from './decks-api.ts'
import { addDeck, setDecks } from './decks-reducer.ts'

export const fetchDecks = () => (dispatch: AppDispatch) => {
  decksAPI.fetchDecks().then(res => {
    dispatch(setDecks(res.data.items))
  })
}

export const postDeck = (name: string) => (dispatch: AppDispatch) => {
  return decksAPI.postDeck(name).then(res => {
    dispatch(addDeck(res.data))
  })
}