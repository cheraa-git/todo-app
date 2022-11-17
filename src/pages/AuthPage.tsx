import React, { useEffect, useState } from 'react'
import { loginUser, registerUser } from '../store/actions/authActions'
import { setError } from '../store/slices/authSlice'
import { RootState } from '../store/store'
import { useAppDispatch, useAppSelector } from '../store/store'
import { Loader } from "../components/Loader/Loader"

export const AuthPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const { error, loading } = useAppSelector((state: RootState) => state.auth)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [email, setEmail] = useState('')
  const [mode, setMode] = useState<'login' | 'register'>('login')

  useEffect(() => {
    if (error !== '') {
      dispatch(setError(''))
    }
  }, [dispatch])

  const registerHandler = () => {
    if (password && email && password === confirmPassword) {
      dispatch(registerUser(email, password))
    } else {
      alert('Данные некорректны')
    }
  }

  const loginHandler = () => {
    if (password && email) {
      dispatch(loginUser(email, password))
    } else {
      alert('Данные некорректны')
    }
  }

  let content = null
  if (mode === 'register') {
    content = (
      <>
        <h2 className="display-6">Регистрация</h2>

        <div className="mb-3">
          <label className="form-label lead">E-mail</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label lead">Пароль</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            minLength={6}
          />
          <div className="invalid-feedback">Не менее 6 символов</div>
        </div>

        <div className="mb-3">
          <label className="form-label lead">Пароль еще раз</label>
          <input
            type="password"
            className="form-control"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>

        <button className="btn btn-primary" onClick={registerHandler}>
          Зарегестрироваться
        </button>
        <button className="btn btn-link" onClick={() => setMode('login')}>
          Вход
        </button>
      </>
    )
  } else {
    content = (
      <>
        <h1 className="display-6">Вход</h1>
        <div className="mb-3">
          <label className="lead form-label">E-mail</label>
          <input className="form-control" value={email} onChange={e => setEmail(e.target.value)} required/>
        </div>

        <div className="mb-3">
          <label className="lead form-label">Пароль</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={e => setPassword(e.target.value)}
            minLength={6}
            required
          />
        </div>
        {
          loading
            ? <Loader/>
            : <button className="btn btn-primary" onClick={loginHandler}>Войти</button>
        }

        <button className="btn btn-link" onClick={() => setMode('register')}>
          Регистрация
        </button>
      </>
    )
  }
  return (
    <div className="container">
      {error && <p className="text-danger">{error}</p>}
      {content}
    </div>
  )
}
