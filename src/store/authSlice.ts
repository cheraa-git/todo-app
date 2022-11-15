import { createSlice } from '@reduxjs/toolkit'
import { loginUser } from './actions/authActions'

interface authState {
  email: string
  token: string
  userId: string
  loading: boolean
  error: string
}

const initialState: authState = {
  email: '',
  token: '',
  userId: '',
  loading: false,
  error: '',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload
    },
    logOut: state => {
      state.token = ''
      localStorage.removeItem('token')
    },
    autoLogin: state => {
      const token = localStorage.getItem('token')
      const email = localStorage.getItem('email')
      const userId = localStorage.getItem('userId')
      const expirationDate = new Date(localStorage.getItem('expirationDate') + '')
      if (token && email && userId && expirationDate >= new Date()) {
        state.email = email
        state.token = token
        state.userId = userId
      } else {
        state.email = ''
        state.token = ''
        state.userId = ''
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        localStorage.removeItem('email')
        localStorage.removeItem('expirationDate')
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(loginUser.pending, state => {
      state.loading = true
      state.error = ''
    })
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      console.log('fulfilled', payload)

      state.email = payload.email
      state.token = payload.idToken
    })
    builder.addCase(loginUser.rejected, (state, { error }) => {
      state.error = 'error: ' + error.message
      console.log(error)
    })
  },
})

export const { setError, logOut, autoLogin } = authSlice.actions

export default authSlice.reducer
