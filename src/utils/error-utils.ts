import { Dispatch } from 'redux'
import { setAppError, SetAppErrorType, setAppStatus, SetAppStatusType } from '../app/app-reducer'
import { ResponseType } from '../api/todolists-api'

export const handleServerAppError = <T>(dispatch: Dispatch<ErrorUtilsDispatchType>, data: ResponseType<T>) => {
  if (data.messages.length) {
    dispatch(setAppError(data.messages[0]))
  } else {
    dispatch(setAppError('Some error'))
  }
  dispatch(setAppStatus('failed'))
}

export const handleServerNetworkError = (dispatch: Dispatch<ErrorUtilsDispatchType>, message: string) => {
  dispatch(setAppError(message))
  dispatch(setAppStatus('failed'))
}

type ErrorUtilsDispatchType = SetAppErrorType | SetAppStatusType
