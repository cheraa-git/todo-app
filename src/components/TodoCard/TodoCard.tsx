import React, { useEffect, useState } from 'react'
import { addTodo, clearCompletedTodos, fetchTodos, setTodoStatus } from '../../store/actions/todoActions'
import { Todo } from '../../store/interfaces'
import { RootState, useAppDispatch, useAppSelector } from '../../store/store'
import { setTodoCategory } from '../../store/slices/todoSlice'
import { Loader } from '../Loader/Loader'
import './TodoCard.sass'

function reverseTodos(array: Todo[]) {
  let output = []
  for (let i = array.length - 1; i > -1; i--) {
    output.push(array[i])
  }

  return output
}

export const TodoCard: React.FC = () => {
  const dispatch = useAppDispatch()
  const { todos, loading, error, category } = useAppSelector((state: RootState) => state.todo)
  const [isHide, setIsHide] = useState(false)
  const [title, setTitle] = useState('')

  useEffect(() => {
    if (error !== '') {
      alert('Todos Error: ' + error)
    }
  }, [error])

  const addHandler = (keyboardEvent?: React.KeyboardEvent<HTMLInputElement>) => {
    if (keyboardEvent && keyboardEvent.code !== 'Enter') return
    if (title) {
      dispatch(addTodo({ title }))
      if (!error) {
        setTitle('')
      }
    }
  }

  const footerBtnClass = (value: string) => {
    if (value === category) {
      return 'current'
    }
    return ''
  }

  const categoryHandler = (value: 'all' | 'active' | 'completed') => {
    dispatch(setTodoCategory(value))
    dispatch(fetchTodos())
  }


  return (
    <div className="card">
      <div className="card__input">
        <i className="bi bi-chevron-compact-down" onClick={() => setIsHide(prev => !prev)}/>
        <input
          className="card__input"
          type="text"
          placeholder="What needs to be done?"
          value={title}
          onChange={e => setTitle(e.target.value)}
          onKeyDown={(e) => addHandler(e)}

        />
        {loading ? <Loader/> : <i className="bi bi-send" onClick={() => addHandler()}/>}
      </div>

      <div className="card__items">
        {!isHide &&
          (todos).map((item, index) => {
            setTimeout(() => {
            }, index * 1000)
            return (
              <div className={`item ${item.done ? 'completed' : ''}`} key={index}>
                <i
                  className={`bi bi-${item.done ? 'check-' : ''}circle`}
                  onClick={() => dispatch(setTodoStatus(item))}
                />
                <p>{item.title}</p>
              </div>
            )
          })}
      </div>

      <div className="card__footer">

        <div className="">
          <button className={footerBtnClass('all')} onClick={() => categoryHandler('all')}>
            all
          </button>
          <button className={footerBtnClass('active')} onClick={() => categoryHandler('active')}>
            active
          </button>
          <button className={footerBtnClass('completed')} onClick={() => categoryHandler('completed')}>
            completed
          </button>
        </div>

        <button className={category === 'active' ? 'disabled' : ''}
                disabled={category !== 'completed'}
                onClick={() => dispatch(clearCompletedTodos())}
        >
          clear completed
        </button>

      </div>
    </div>
  )
}
