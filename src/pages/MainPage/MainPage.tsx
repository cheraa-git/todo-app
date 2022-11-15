import React, { useEffect } from 'react'
import { TodoCard } from '../../components/TodoCard/TodoCard'
import { fetchTodos } from '../../store/actions/todoActions'
import { logOut } from '../../store/authSlice'
import { RootState, useAppDispatch, useAppSelector } from '../../store/store'
import './MainPage.sass'

export const MainPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const { email } = useAppSelector((state: RootState) => state.auth)

  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch])


  return (
    <div className="main-page">
      <div className="main-page__user">
        <span>{email}</span>
        <button className="btn btn-link" onClick={() => dispatch(logOut())}>
          Logout
        </button>
      </div>
      <div className="container">
        <h1 className="main-page__title">todos</h1>
        <TodoCard />
      </div>
    </div>
  )
}
