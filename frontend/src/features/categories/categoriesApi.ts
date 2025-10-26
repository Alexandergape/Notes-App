import { createAsyncThunk } from '@reduxjs/toolkit'
import type { Category } from './categoriesSlice'
import axios from 'axios'

export const fetchCategories = createAsyncThunk('categories/fetchAll', async () => {
  const response = await axios.get('http://localhost:8080/categories')
  return response.data as Category[]
})

export const createCategory = createAsyncThunk('categories/create', async (name: string) => {
  const response = await axios.post('http://localhost:8080/categories', { name })
  return response.data as Category
})

export const deleteCategory = createAsyncThunk('categories/delete', async (id: number) => {
  await axios.delete(`http://localhost:8080/categories/${id}`)
  return id
})
