import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useAppDispatch } from "../store/store"
import { clearUser, setUser } from "../store/slices/authSlice"
import { useMemo, useState } from "react"


/**
 * Checks whether the user is logged in to firebase authorisation.
 * If yes, then adds the authorisation data to the redux storage
 * @return - authorisation status
 */
export function useAuthInit() {
  const dispatch = useAppDispatch()
  const auth = getAuth()
  const [authState, setAuthState] = useState<'loading' | 'auth' | 'non-auth'>('loading')

  useMemo(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        dispatch(setUser({ email: user.email, uid: user.uid }))
        setAuthState('auth')
      } else {
        dispatch(clearUser())
        setAuthState('non-auth')
      }
    })
  }, [auth, dispatch])


  return authState
}