import { createSlice } from '@reduxjs/toolkit'
import { createCategory, deleteCategory, fetchCategories } from './categoriesApi'

export interface Category {
  id: number
  name: string
}

interface CategoriesState {
  categories: Category[]
  loading: boolean
  error: string | null
  selectedCategories: number[]
}

const initialState: CategoriesState = {
  categories: [],
  loading: false,
  error: null,
  selectedCategories: []
}

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setSelectedCategories: (state, action) => {
      state.selectedCategories = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false
        state.categories = action.payload
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to load categories'
      })
      //
      .addCase(createCategory.pending, (state) => {
        state.loading = true
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false
        state.categories.push(action.payload)
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to create category'
      })
      //
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false
        state.categories = state.categories.filter((c) => c.id !== action.payload)
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to delete category'
      })
  }
})

export default categoriesSlice.reducer

export const { setSelectedCategories } = categoriesSlice.actions
