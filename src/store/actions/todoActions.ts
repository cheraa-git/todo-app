import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosTodo from '../axios-todo'
import { Todo } from '../interfaces'
import { RootState } from '../store'

export const fetchTodos = createAsyncThunk('todo/fetchTodos', async (_, { getState }) => {
  const category = (getState() as RootState).todo.category

  let filter = ''

  if (category === 'active') {
    filter = '?orderBy="done"&equalTo=false'
  } else if (category === 'completed') {
    filter = '?orderBy="done"&equalTo=true'
  }

  const result: Todo[] = []
  const response = await axiosTodo.get(`/${localStorage.getItem('userId')}/todos.json${filter}`)
  Object.keys(response.data).forEach(key => {
    result.push({ id: key, ...response.data[key] })
  })
  return result
})
export const addTodo = createAsyncThunk(
  'todo/postTodo',
  async ({ title, userId }: { title: string; userId: string }) => {
    const response = await axiosTodo.post(`/${userId}/todos.json`, { title, done: false })
    return { id: response.data.name, title, done: false } as Todo
  }
)

export const setTodoStatus = createAsyncThunk('todo/setTodoStatus', async (todo: Todo) => {
  const userId = localStorage.getItem('userId')
  const response = await axiosTodo.patch(`/${userId}/todos/${todo.id}.json`, { done: !todo.done })
  return { ...todo, done: response.data.done } as Todo
})
