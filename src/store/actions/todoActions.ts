import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosTodo from '../axios-todo'
import { editTodoPayload, Todo } from '../interfaces'
import { RootState } from '../store'
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"
import { setTodo, setTodoError, setTodoLoading } from "../slices/todoSlice"


/**
 * Fetching todos from firebase
 * @return {Todo[]} - todo list
 */
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


/**
 * Adding new to-do to firebase
 * @param {{title: string}} payload - title for the new to-do
 * @return {Todo} - new to-do
 */
export const addTodo = createAsyncThunk('todo/postTodo', async ({ title }: { title: string; }, { getState }) => {
  const { uid } = (getState() as RootState).auth
  const response = await axiosTodo.post(`/${uid}/todos.json`, { title, done: false })
  return { id: response.data.name, title, done: false } as Todo
})


/**
 * Editing data in existing to-do
 * @param {editTodoPayload} payload
 */
export const editTodo = createAsyncThunk('todo/editTodo', async ({ todo, flags }: editTodoPayload, {
  getState,
  dispatch
}) => {
  const { uid } = (getState() as RootState).auth
  const storage = getStorage()

  if (flags && flags.isImgDelete) {
    const storageRef = ref(storage, todo.image?.storagePath)
    todo.image = null
    dispatch(setTodoLoading(true))
    deleteObject(storageRef)
      .then(() => {
        dispatch(setTodoLoading(false))
      })
      .catch((error) => {
        dispatch(setTodoError(error.message))
        console.log('delete img error:', error)
      })
  }
  if (flags && flags.addImg) {
    const file = flags.addImg
    const filePath = `images/${todo.id}-${new Date().getTime()}.${file.name}`
    const storageRef = ref(storage, filePath)
    dispatch(setTodoLoading(true))
    uploadBytes(storageRef, flags.addImg)
      .then(({ ref }) => {
        getDownloadURL(storageRef)
          .then((url) => {
            axiosTodo.patch(`/${uid}/todos/${todo.id}.json`, {
              ...todo,
              id: undefined,
              image: { url, title: file.name, storagePath: ref.fullPath }
            })
              .then(({ data }) => {
                dispatch(setTodo({ ...data, id: todo.id } as Todo))
              })
          })
          .catch((error) => {
            dispatch(setTodoError(error.message))
            console.log(error)
          })
      })
      .catch((error) => {
        dispatch(setTodoError(error.message))
        console.log(error)
      })
  } else {
    axiosTodo.patch(`/${uid}/todos/${todo.id}.json`, { ...todo, id: undefined, })
      .then(({ data }) => {
        dispatch(setTodo({ ...data, id: todo.id } as Todo))
      })
  }

})

/**
 * deleting completed tasks from firebase
 */
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


