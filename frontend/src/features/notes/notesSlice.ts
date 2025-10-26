import { createSlice } from '@reduxjs/toolkit'
import {
  addNote,
  deleteNote,
  fetchArchivedNotes,
  fetchNotes,
  fetchNotesByCategory,
  toggleArchiveNote,
  updateNote
} from './notesApi'
import type { Category } from '../categories/categoriesSlice'

export interface Note {
  id: number
  title: string
  content: string
  archived: boolean
  createdAt: string
  updatedAt: string
  categories: Category[]
}

export interface NoteRequest {
  id: number
  title: string
  content: string
  categoryIds: number[] // just the IDs
}

interface NotesState {
  notes: Note[]
  archivedNotes: Note[]
  filteredNotes: Note[]
  loading: boolean
  error: string | null
  currentNote: Note | null
  isEditing: boolean
}

const initialState: NotesState = {
  notes: [],
  archivedNotes: [],
  filteredNotes: [],
  loading: false,
  error: null,
  currentNote: null,
  isEditing: false
}

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setCurrentNote: (state, action) => {
      state.currentNote = action.payload
      state.isEditing = true
    },
    setIsEditing: (state, action) => {
      state.isEditing = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.loading = false
        state.notes = action.payload
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || null
      })
      //
      .addCase(addNote.pending, (state) => {
        state.loading = true
      })
      .addCase(addNote.fulfilled, (state, action) => {
        state.notes.push(action.payload)
        state.loading = false
      })
      .addCase(addNote.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || null
      })
      //
      .addCase(updateNote.pending, (state) => {
        state.loading = true
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        const updated = action.payload
        const indexInNotes = state.notes.findIndex((n) => n.id === updated.id)
        const indexInArchived = state.archivedNotes.findIndex((n) => n.id === updated.id)

        if (updated.archived) {
          // moved to archived: remove from notes, add/update archived
          if (indexInNotes >= 0) state.notes.splice(indexInNotes, 1)
          if (indexInArchived >= 0) state.archivedNotes[indexInArchived] = updated
          else state.archivedNotes.push(updated)
        } else {
          // moved to active: remove from archived, add/update notes
          if (indexInArchived >= 0) state.archivedNotes.splice(indexInArchived, 1)
          if (indexInNotes >= 0) state.notes[indexInNotes] = updated
          else state.notes.push(updated)
        }

        state.loading = false
        state.isEditing = false
      })
      .addCase(updateNote.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || null
      })
      //
      .addCase(deleteNote.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.notes = state.notes.filter((n) => n.id !== action.payload)
        state.archivedNotes = state.archivedNotes.filter((n) => n.id !== action.payload)
        state.loading = false
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || null
      })
      //
      .addCase(toggleArchiveNote.pending, (state) => {
        state.loading = true
      })
      .addCase(toggleArchiveNote.fulfilled, (state, action) => {
        const updated = action.payload
        const indexInNotes = state.notes.findIndex((n) => n.id === updated.id)
        const indexInArchived = state.archivedNotes.findIndex((n) => n.id === updated.id)

        if (updated.archived) {
          // moved to archived: remove from notes, add/update archived
          if (indexInNotes >= 0) state.notes.splice(indexInNotes, 1)
          if (indexInArchived >= 0) state.archivedNotes[indexInArchived] = updated
          else state.archivedNotes.push(updated)
        } else {
          // moved to active: remove from archived, add/update notes
          if (indexInArchived >= 0) state.archivedNotes.splice(indexInArchived, 1)
          if (indexInNotes >= 0) state.notes[indexInNotes] = updated
          else state.notes.push(updated)
        }

        state.loading = false
      })
      .addCase(toggleArchiveNote.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || null
      })
      //
      .addCase(fetchArchivedNotes.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchArchivedNotes.fulfilled, (state, action) => {
        state.loading = false
        state.archivedNotes = action.payload
      })
      .addCase(fetchArchivedNotes.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || null
      })
      //
      .addCase(fetchNotesByCategory.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchNotesByCategory.fulfilled, (state, action) => {
        state.loading = false
        state.filteredNotes = action.payload
      })
      .addCase(fetchNotesByCategory.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || null
      })
  }
})

export default notesSlice.reducer
export const { setCurrentNote, setIsEditing } = notesSlice.actions
