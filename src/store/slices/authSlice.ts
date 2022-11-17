import { createSlice } from '@reduxjs/toolkit'


interface authState {
  email: string | null
  uid: string
  loading: boolean
  error: string
}

const initialState: authState = {
  email: '',
  uid: '',
  loading: false,
  error: '',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
    setAuthLoading: (state, {payload}) => {
      state.loading = payload
    },
    setUser: (state, {payload} ) => {
        state.email = payload.email
        state.uid = payload.uid
        state.loading = false
    },
    clearUser: (state) => {
      state.email = ''
      state.uid = ''
      state.loading = false
    },

  },
})

export const { setError, setUser, clearUser, setAuthLoading } = authSlice.actions

export default authSlice.reducer
