import { Route, Routes } from 'react-router-dom'
import { AuthPage } from './pages/AuthPage'
import { MainPage } from './pages/MainPage/MainPage'
import { useAuthInit } from "./hooks/useAuthInit"
import { Loader } from "./components/Loader/Loader"

function App() {
  const authStatus = useAuthInit()

  let routes = <Route element={<MainPage/>} path="/"/>

  if (authStatus === 'non-auth') {
    routes = <Route element={<AuthPage/>} path="/"/>
  } else if (authStatus === 'loading') {
    routes = <Route element={<Loader/>} path={'/'}/>
  }


  return (
    <>
      <Routes>{routes}</Routes>
    </>
  )
  }

  export default App
