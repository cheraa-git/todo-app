import { createSlice, PayloadAction } from '@reduxjs/toolkit'


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
    /**
     * Set an authorization error
     * @param state - the parameter is passed automatically
     * @param payload - error message
     */
    setError: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
      state.loading = false
    },

    /**
     * Set an authorization loading
     * @param state - the parameter is passed automatically
     * @param payload - true for start loading, false for end loading
     */
    setAuthLoading: (state, {payload}) => {
      state.loading = payload
    },

    /**
     * Add user data to redux storage
     * @param state - the parameter is passed automatically
     * @param payload - user uid and email
     */
    setUser: (state, {payload}: PayloadAction<{email: string | null, uid: string}> ) => {
        state.email = payload.email
        state.uid = payload.uid
        state.loading = false
    },

    /**
     * Clearing user data in redux storage
     */
    clearUser: (state) => {
      state.email = ''
      state.uid = ''
      state.loading = false
    },

  },
})

export const { setError, setUser, clearUser, setAuthLoading } = authSlice.actions

export default authSlice.reducer
