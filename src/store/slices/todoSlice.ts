import { createSlice } from '@reduxjs/toolkit'
import { addTodo, clearCompletedTodos, fetchTodos, setTodoStatus } from '../actions/todoActions'
import { Todo } from '../interfaces'

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
    setLoading: (state) => {
      state.loading = !state.loading
    },
    setTodoCategory: (state, { payload }) => {
      state.category = payload
    },
    hideTodo: (state, { payload }) => {

    }
  },
  extraReducers(builder) {
    // ADD_TODO
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

    // SET TODO_STATUS
    builder.addCase(setTodoStatus.pending, state => {
      state.loading = true
    })
    builder.addCase(setTodoStatus.fulfilled, (state, { payload }) => {

      // TODO: after setting the todo status, hide the todo (if category !== 'all') after 5 seconds of timeout

      state.todos.forEach(todo => {
        if (todo.id === payload.id) {
          todo.done = payload.done
        }
      })
      state.loading = false
      // setTimeout(() => {
      if (state.category !== 'all') {
        state.todos = state.todos.filter(todo => todo.id !== payload.id)
      }
      // }, 2000)
    })
    builder.addCase(setTodoStatus.rejected, (state, { error }) => {
      state.error = 'Fetch todos error: ' + error.message
      console.log('Fetch todos error:', error)
      state.loading = false
    })

    // CLEAR COMPLETED TODOS
    builder.addCase(clearCompletedTodos.fulfilled, (state, { payload }) => {
      state.todos = state.todos.filter(todo => !payload?.includes(todo.id))
    })
  },

})

export const { setLoading, setTodoCategory } = todoSlice.actions

export default todoSlice.reducer
