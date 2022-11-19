import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { addTodo, clearCompletedTodos, fetchTodos } from '../actions/todoActions'
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
    /**
     * Set a to-do loading
     * @param state - the parameter is passed automatically
     * @param {boolean} payload - true for start loading, false for end loading
     */
    setTodoLoading: (state, {payload}: PayloadAction<boolean>) => {
      state.loading = payload
    },

    /**
     * Set a to-do error
     * @param state - the parameter is passed automatically
     * @param {string} payload - error message
     */
    setTodoError: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
      state.loading = false
    },

    /**
     * Set a current to-do category
     * @param state - the parameter is passed automatically
     * @param payload - current category
     */
    setTodoCategory: (state, { payload }: PayloadAction<todoState['category']>) => {
      state.category = payload
    },

    /**
     * Hide the to-do by deleting it from the local redux storage
     * @param state - the parameter is passed automatically
     * @param payload - to-do item
     */
    hideTodo: (state, { payload }: PayloadAction<Todo>) => {
      if (state.category !== 'all') {
        state.todos = state.todos.filter(todo => todo.id !== payload.id)
      }
    },

    /**
     * Add a new to-do to the redux storage
     * @param state - the parameter is passed automatically
     * @param payload - to-do item
     */
    setTodo: (state, {payload}: PayloadAction<Todo>) => {
      // todo: after setting the todo status, hide the todo (if category !== 'all') after 5 seconds of timeout
      state.todos = state.todos.map(todo => todo.id === payload.id ? { ...todo, ...payload } : todo)
      state.loading = false
    }
  },
  extraReducers(builder) {
    // ADD_TODO
    builder.addCase(addTodo.pending, state => {
      state.loading = true
    })
    builder.addCase(addTodo.fulfilled, (state, { payload }) => {
      if (state.category !== 'completed') {
        state.todos.push(payload)
      }
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


    // CLEAR COMPLETED TODOS
    builder.addCase(clearCompletedTodos.pending, state => {
      state.loading = true
    })
    builder.addCase(clearCompletedTodos.fulfilled, (state, { payload }) => {
      state.todos = state.todos.filter(todo => !payload?.includes(todo.id))
      state.loading = false
    })
    builder.addCase(clearCompletedTodos.rejected, (state, { error }) => {
      state.error = 'Clear completed todos error: ' + error.message
      console.log('Fetch todos error:', error)
      state.loading = false
    })

  },

})

export const { setTodoLoading, setTodoCategory, hideTodo, setTodoError, setTodo } = todoSlice.actions

export default todoSlice.reducer
