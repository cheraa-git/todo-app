import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosTodo from '../axios-todo'
import { Todo } from '../interfaces'
import { AppDispatch, RootState } from '../store'
import { getDatabase, ref, get, child} from "firebase/database";
import {getFirestore} from 'firebase/firestore'

export const fetchTodos_ = (uid: string) => (dispatch: AppDispatch) => {
  const db = getFirestore()


  // const dbRef = ref(getDatabase())
  // get(child(dbRef, `${uid}/todos`))
  //
  //   .then((snapshot) => {
  //     console.log(snapshot.val())
  //   })
  //   .catch((err) => console.log(err))

}

export const fetchTodos = createAsyncThunk('todo/fetchTodos', async (_: void, { getState }) => {
  const category = (getState() as RootState).todo.category
  const uid = (getState() as RootState).auth.uid

  let filter = ''

  if (category === 'active') {
    filter = '?orderBy="done"&equalTo=false'
  } else if (category === 'completed') {
    filter = '?orderBy="done"&equalTo=true'
  }

  const result: Todo[] = []
  const response = await axiosTodo.get(`/${uid}/todos.json${filter}`)
  Object.keys(response.data).forEach(key => {
    result.push({ id: key, ...response.data[key] })
  })
  return result
})


export const addTodo = createAsyncThunk('todo/postTodo', async ({ title }: { title: string; }, { getState }) => {
  const { uid } = (getState() as RootState).auth
  const response = await axiosTodo.post(`/${uid}/todos.json`, { title, done: false })
  return { id: response.data.name, title, done: false } as Todo
})

export const setTodoStatus = createAsyncThunk('todo/setTodoStatus', async (todo: Todo, { getState }) => {
  const { uid } = (getState() as RootState).auth
  const response = await axiosTodo.patch(`/${uid}/todos/${todo.id}.json`, { done: !todo.done })
  return { ...todo, done: response.data.done } as Todo
})

export const clearCompletedTodos = createAsyncThunk(
  'todo/clear/CompletedTodos',
  async (_, { getState, rejectWithValue }) => {
    const { todo, auth } = (getState() as RootState)
    const delTodo = todo.todos.filter(todo => todo.done)
    let successCount = 0
    for (let { id } of delTodo) {
      const response = await axiosTodo.delete(`/${auth.uid}/todos/${id}.json`)
      if (response.status === 200) successCount++
    }
    if (delTodo.length === successCount) {
      return delTodo.map(todo => todo.id)
    } else {
      rejectWithValue('Not all tasks have been deleted. Try again.')
    }

  })
