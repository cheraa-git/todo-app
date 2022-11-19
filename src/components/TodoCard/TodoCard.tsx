import React, { useEffect, useState } from 'react'
import { addTodo, clearCompletedTodos, fetchTodos, editTodo } from '../../store/actions/todoActions'
import { Todo } from '../../store/interfaces'
import { RootState, useAppDispatch, useAppSelector } from '../../store/store'
import { hideTodo, setTodoCategory } from '../../store/slices/todoSlice'
import { Loader } from '../Loader/Loader'
import './TodoCard.sass'
import { ItemConfig } from "./ItemConfig"

/**
 * Converts the date to a format to display
 * @param date - date in string format ( String(new Date()) )
 * @return formatted date: "[day].[month].[year] [hour]:[minute]"
 */
function parseDate(date: string | undefined) {
  if (!date) return undefined
  const d = new Date(date)
  const month = d.getMonth() > 8 ? `${d.getMonth() + 1}` : `0${d.getMonth() + 1}`
  const hour = d.getHours() > 9 ? d.getHours() : `0${d.getHours()}`
  const minute = d.getMinutes() > 9 ? d.getMinutes() : `0${d.getMinutes()}`
  return `${d.getDate()}.${month}.${d.getFullYear()} ${hour}:${minute}`
}

function isCompleted(date: string) {
  return new Date(date) <= new Date()
}

function reverseTodos(array: Todo[]) {
  let output = []
  for (let i = array.length - 1; i > -1; i--) {
    output.push(array[i])
  }

  return output
}

/**
 * The card component with a list of to-do
 */
export const TodoCard: React.FC = () => {
  const dispatch = useAppDispatch()
  const { todos, loading, error, category } = useAppSelector((state: RootState) => state.todo)
  const [isHide, setIsHide] = useState(false)
  const [title, setTitle] = useState('')
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null)

  useEffect(() => {
    if (error !== '') {
      alert('Todos Error: ' + error)
    }
  }, [error])


  const addHandler = (keyboardEvent?: React.KeyboardEvent<HTMLInputElement>) => {
    if (keyboardEvent && keyboardEvent.code !== 'Enter' || loading) return
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

  const completeTodo = (item: Todo) => {
    dispatch(editTodo({ todo: { ...item, done: !item.done } }))
    setTimeout(() => {
      dispatch(hideTodo(item))
    }, 1000)
  }

  const itemClassList = (todo: Todo) => {
    const classList = ['item']
    if (todo.done) {
      classList.push('completed')
    } else if (todo.completionDate && isCompleted(todo.completionDate)) {
      classList.push('overdue')
    }
    return classList.join(' ')
  }
  const cardContent = (
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

        {loading ? <Loader width={"2.2rem"}/> : <i className="bi bi-send" onClick={() => addHandler()}/>}
      </div>

      <div className="card__items">
        {!isHide &&
          (todos).map((item, index) => {
            return (
              <div className={itemClassList(item)} key={index}>
                <i
                  className={`bi bi-${item.done ? 'check-' : ''}circle`}
                  onClick={() => completeTodo(item)}
                />

                <div className="fullWidth">
                  <p className="item-title" onClick={() => setCurrentTodo(item)}>{item.title} </p>

                  <div className="item__content">

                    {item.completionDate && <span className="bi bi-calendar"> {parseDate(item.completionDate)}</span>}
                    {item.description && <span className="bi bi-card-text"> Заметка</span>}
                    {item.image && <span className="bi bi-paperclip"> Фото</span>}

                  </div>
                </div>
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
                disabled={category === 'active'}
                onClick={() => dispatch(clearCompletedTodos())}
        >
          clear completed
        </button>
      </div>

    </div>
  )


  return (
    <>
      {
        currentTodo
          ? <ItemConfig currentTodo={currentTodo} onClose={() => setCurrentTodo(null)}/>
          : cardContent
      }

    </>
  )
}
