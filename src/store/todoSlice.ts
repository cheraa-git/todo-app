import { createSlice } from '@reduxjs/toolkit'
import { addTodo, fetchTodos, setTodoStatus } from './actions/todoActions'
import { Todo } from './interfaces'

interface todoState {
  todos: Todo[]
  loading: boolean
  error: string
  category: 'active' | 'completed' | 'all'
}

const initialState: todoState = {
  todos: [],
  loading: false,
  error: '',
  category: 'active',
}

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setLoading: state => {
      state.loading = !state.loading
    },
    setTodoCategory: (state, { payload }) => {
      state.category = payload
    },
  },
  extraReducers(builder) {
    // ADD TODO
    builder.addCase(addTodo.pending, state => {
      state.loading = true
    })
    builder.addCase(addTodo.fulfilled, (state, { payload }) => {
      state.todos.push(payload)
      state.loading = false
    })
    builder.addCase(addTodo.rejected, (state, { error }) => {
      state.error = 'Add todo error: ' + error.message
      console.log('Add todo error:', error)
      state.loading = false
    })

    // FETCH TODOS
    builder.addCase(fetchTodos.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchTodos.fulfilled, (state, { payload }) => {
      state.todos = payload
      state.loading = false
    })
    builder.addCase(fetchTodos.rejected, (state, { error }) => {
      state.error = 'Fetch todos error: ' + error.message
      console.log('Fetch todos error:', error)
      state.loading = false
    })

    // SET TODO STATUS
    builder.addCase(setTodoStatus.pending, state => {
      state.loading = true
    })
    builder.addCase(setTodoStatus.fulfilled, (state, { payload }) => {
      state.todos.forEach(todo => {
        if (todo.id === payload.id) {
          todo.done = payload.done
        }
      })
      state.loading = false
    })

    builder.addCase(setTodoStatus.rejected, (state, { error }) => {
      state.error = 'Fetch todos error: ' + error.message
      console.log('Fetch todos error:', error)
      state.loading = false
    })
  },
})

export const { setLoading, setTodoCategory } = todoSlice.actions

export default todoSlice.reducer
