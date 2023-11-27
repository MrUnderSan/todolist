import { AppDispatch } from '../../app/store.ts'
import { decksAPI, PatchModelType } from './decks-api.ts'
import { addDeck, removeDeck, setDecks, updateDeck } from './decks-reducer.ts'

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

export const deleteDeck = (id: string) => (dispatch: AppDispatch) => {
  decksAPI.deleteDeck(id).then(() => {
    dispatch(removeDeck(id))
  })
}

export const patchDeck = (id: string, model: PatchModelType) => (dispatch: AppDispatch) => {
  decksAPI.patchDeck(id, model).then(res => {
    dispatch(updateDeck(res.data))
  })
}