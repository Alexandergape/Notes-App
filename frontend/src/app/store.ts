import { configureStore } from '@reduxjs/toolkit'
import notesReducer from '../features/notes/notesSlice'
import categoriesReducer from '../features/categories/categoriesSlice'

export const store = configureStore({
  reducer: {
    notes: notesReducer,
    categories: categoriesReducer
  }
})

// types for useSelector and useDispatch
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
