import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, } from "firebase/auth"
import { clearUser, setAuthLoading, setError, setUser } from "../slices/authSlice"
import { AppDispatch } from "../store"


/**
 * Sing in with email and password
 * @param email
 * @param password
 */
export const loginUser = (email: string, password: string) => (dispatch: AppDispatch) => {
  const auth = getAuth()
  dispatch(setAuthLoading(true))
  signInWithEmailAndPassword(auth, email, password)
    .then(({ user }) => {
      dispatch(setUser({ email: user.email, uid: user.uid }))
    })
    .catch((error) => {
      dispatch(setError(error.message))
      console.log(error)
    })
}

/**
 * log out of the current authorization account
 */
export const logoutUser = () => (dispatch: AppDispatch) => {
  dispatch(setAuthLoading(true))
  getAuth().signOut()
    .then(() => dispatch(clearUser()))
    .catch((err) => console.log(err))
}

/**
 * Sing up with email and password
 * @param email
 * @param password
 */
export const registerUser = (email: string, password: string) => (dispatch: AppDispatch) => {
  const auth = getAuth()
  dispatch(setAuthLoading(true))
  createUserWithEmailAndPassword(auth, email, password)
    .then(({ user }) => dispatch(setUser({ email: user.email, uid: user.uid })))
    .catch((err) => {
      dispatch(setError(err.message))
      console.log(err)
    })
}

