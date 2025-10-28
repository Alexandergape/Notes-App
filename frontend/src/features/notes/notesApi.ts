import { createAsyncThunk } from '@reduxjs/toolkit'
import type { Note, NoteRequest } from './notesSlice'
import { api } from '../../api/api'

export const fetchNotes = createAsyncThunk('notes/fetchNotes', async () => {
  const res = await api.get<Note[]>('/notes')
  return res.data
})

export const fetchArchivedNotes = createAsyncThunk('notes/fetchArchivedNotes', async () => {
  const res = await api.get<Note[]>('/notes/archived')
  return res.data
})

export const addNote = createAsyncThunk('notes/addNote', async (note: NoteRequest) => {
  const res = await api.post<Note>('/notes', note)
  return res.data
})

export const updateNote = createAsyncThunk('notes/updateNote', async (note: NoteRequest) => {
  const res = await api.put<Note>(`/notes/${note.id}`, note)
  return res.data
})

export const deleteNote = createAsyncThunk('notes/deleteNote', async (id: number) => {
  await api.delete(`/notes/${id}`)
  return id
})

export const toggleArchiveNote = createAsyncThunk('notes/toggleArchiveNote', async (id: number) => {
  const res = await api.patch<Note>(`/notes/${id}/archive`)
  return res.data
})

export const fetchNotesByCategory = createAsyncThunk(
  'notes/fetchNotesByCategory',
  async ({ categoryIds, archived }: { categoryIds: number[]; archived: boolean }) => {
    const query = categoryIds.join(',')
    const res = await api.get<Note[]>(`/notes/category/ids/${archived}?categories=${query}`)
    return res.data
  }
)
