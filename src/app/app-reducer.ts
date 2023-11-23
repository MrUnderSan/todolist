export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
  status: 'idle' as RequestStatusType,
  error: null as null | string,
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS':
      return { ...state, status: action.status }
    case 'APP/SET-ERROR':
      return { ...state, error: action.error }
    default:
      return state
  }
}

export const setAppStatus = (status: RequestStatusType) => ({ type: 'APP/SET-STATUS', status } as const)
export const setAppError = (error: string | null) => ({ type: 'APP/SET-ERROR', error } as const)

export type SetAppStatusType = ReturnType<typeof setAppStatus>
export type SetAppErrorType = ReturnType<typeof setAppError>

type ActionsType = SetAppStatusType | SetAppErrorType