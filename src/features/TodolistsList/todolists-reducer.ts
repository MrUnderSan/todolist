import { todolistsAPI, TodolistType } from "api/todolists-api"
import { handleServerNetworkError } from "utils/error-utils"
import { AppThunk } from "app/store"
import { appActions, RequestStatusType } from "app/app-reducer"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const slice = createSlice({
  name: "todolists",
  initialState: [] as TodolistDomainType[],
  reducers: {
    addTodolist: (state, actions: PayloadAction<{ todolist: TodolistType }>) => {
      const newTodo: TodolistDomainType = { ...actions.payload.todolist, filter: "all", entityStatus: "idle" }
      state.unshift(newTodo)
    },
    removeTodolist: (state, actions: PayloadAction<{ id: string }>) => {
      const index = state.findIndex((todo) => todo.id === actions.payload.id)
      if (index !== -1) state.splice(index, 1)
    },
    changeTodolistTitle: (state, actions: PayloadAction<{ id: string; title: string }>) => {
      const index = state.findIndex((todo) => todo.id === actions.payload.id)
      if (index !== -1) state[index].title = actions.payload.title
    },
    changeTodolistFilter: (state, actions: PayloadAction<{ id: string; filter: FilterValuesType }>) => {
      const index = state.findIndex((todo) => todo.id === actions.payload.id)
      if (index !== -1) state[index].filter = actions.payload.filter
    },
    changeTodolistEntityStatus: (state, actions: PayloadAction<{ id: string; entityStatus: RequestStatusType }>) => {
      const index = state.findIndex((todo) => todo.id === actions.payload.id)
      if (index !== -1) state[index].entityStatus = actions.payload.entityStatus
    },
    setTodolists: (state, actions: PayloadAction<{ todolists: TodolistType[] }>) => {
      return actions.payload.todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }))
    },
    clearTodolists: () => {
      return []
    },
  },
})

export const todolistsActions = slice.actions
export const todolistsReducer = slice.reducer

// thunks
export const fetchTodolistsTC = (): AppThunk => {
  return (dispatch) => {
    dispatch(appActions.setAppStatus({ status: "loading" }))
    todolistsAPI
      .getTodolists()
      .then((res) => {
        dispatch(todolistsActions.setTodolists({ todolists: res.data }))
        dispatch(appActions.setAppStatus({ status: "succeeded" }))
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch)
      })
  }
}
export const removeTodolistTC = (id: string): AppThunk => {
  return (dispatch) => {
    dispatch(appActions.setAppStatus({ status: "loading" }))
    dispatch(todolistsActions.changeTodolistEntityStatus({ id, entityStatus: "loading" }))
    todolistsAPI.deleteTodolist(id).then((res) => {
      dispatch(todolistsActions.removeTodolist({ id }))
      dispatch(appActions.setAppStatus({ status: "succeeded" }))
    })
  }
}
export const addTodolistTC = (title: string): AppThunk => {
  return (dispatch) => {
    dispatch(appActions.setAppStatus({ status: "loading" }))
    todolistsAPI.createTodolist(title).then((res) => {
      dispatch(todolistsActions.addTodolist({ todolist: res.data.data.item }))
      dispatch(appActions.setAppStatus({ status: "succeeded" }))
    })
  }
}
export const changeTodolistTitleTC = (id: string, title: string): AppThunk => {
  return (dispatch) => {
    todolistsAPI.updateTodolist(id, title).then((res) => {
      dispatch(todolistsActions.changeTodolistTitle({ id, title }))
    })
  }
}

export type FilterValuesType = "all" | "active" | "completed"
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
  entityStatus: RequestStatusType
}
