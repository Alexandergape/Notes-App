import { createAsyncThunk } from '@reduxjs/toolkit'
import type { Category } from './categoriesSlice'
import { api } from '../../api/api'

export const fetchCategories = createAsyncThunk('categories/fetchAll', async () => {
  const response = await api.get('/categories')
  return response.data as Category[]
})

export const createCategory = createAsyncThunk('categories/create', async (name: string) => {
  const response = await api.post('/categories', { name })
  return response.data as Category
})

export const deleteCategory = createAsyncThunk('categories/delete', async (id: number) => {
  await api.delete(`/categories/${id}`)
  return id
})
