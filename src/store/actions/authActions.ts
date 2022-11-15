import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    const response = await axios.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDiCPZNN8RXzMYtVqHssKzF2uQq5O5g6Nw',
      { email, password, returnSecureToken: true }
    )
    console.log('response', response.data)
  }
)

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }: { email: string; password: string }) => {
    const response = await axios.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDiCPZNN8RXzMYtVqHssKzF2uQq5O5g6Nw',
      { email, password, returnSecureToken: true }
    )
    const data = response.data
    const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)

    localStorage.setItem('token', data.idToken)
    localStorage.setItem('userId', data.localId)
    localStorage.setItem('email', data.email)
    localStorage.setItem('expirationDate', String(expirationDate))
    return data
  }
)
