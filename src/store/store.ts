import { configureStore } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { TypedUseSelectorHook } from 'react-redux'
import { useDispatch } from 'react-redux'
import authSlice from './authSlice'
import todoSlice from './todoSlice'

export const store = configureStore({
  reducer: {
    todo: todoSlice,
    auth: authSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
