import React, { useEffect } from 'react'
import { TodoCard } from '../../components/TodoCard/TodoCard'
import { fetchTodos, fetchTodos_ } from '../../store/actions/todoActions'
import { RootState, useAppDispatch, useAppSelector } from '../../store/store'
import './MainPage.sass'
import { logoutUser } from "../../store/actions/authActions"
import { Loader } from "../../components/Loader/Loader"

export const MainPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const { email, loading, uid } = useAppSelector((state: RootState) => state.auth)

  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch])


  return (
    <div className="main-page">
      <div className="main-page__user">
        <span>{email}</span>
        {
          loading
            ? <Loader/>
            : <button className="btn btn-link" onClick={() => dispatch(logoutUser())}>Logout</button>
        }

      </div>
      <div className="container">
        <h1 className="main-page__title">todos</h1>
        {/*<button onClick={() => dispatch(fetchTodos_(uid))}>test</button>*/}
        <TodoCard/>
      </div>
    </div>
  )
}
