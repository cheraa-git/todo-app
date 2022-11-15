import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AuthPage } from './pages/AuthPage'
import { MainPage } from './pages/MainPage/MainPage'
import { autoLogin } from './store/authSlice'
import { RootState } from './store/store'
import { useAppDispatch, useAppSelector } from './store/_hooks'

function App() {
  const dispatch = useAppDispatch()
  const { token } = useAppSelector((state: RootState) => state.auth)
  let routes = <Route element={<MainPage />} path="/" />

  useEffect(() => {
    dispatch(autoLogin())
  }, [dispatch, token])
  if (!token) {
    routes = <Route element={<AuthPage />} path="/" />
  }

  return (
    <>
      <Routes>{routes}</Routes>
    </>
  )
}

export default App
