import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../../app/store'
import { type Note, setCurrentNote } from './notesSlice'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import {
  deleteNote,
  fetchArchivedNotes,
  fetchNotes,
  fetchNotesByCategory,
  toggleArchiveNote
} from './notesApi'

const NotesList = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { notes, loading, archivedNotes } = useSelector((state: RootState) => state.notes)
  const [showArchived, setShowArchived] = useState(false)
  const selectedCategories = useSelector((state: RootState) => state.categories.selectedCategories)

  const [displayedNotes, setDisplayedNotes] = useState<Note[]>([])

  useEffect(() => {
    if (showArchived) setDisplayedNotes(archivedNotes)
    else setDisplayedNotes(notes)
  }, [showArchived, notes, archivedNotes])

  useEffect(() => {
    dispatch(fetchNotes())
  }, [dispatch])

  useEffect(() => {
    // filter notes based on selected categories
    if (selectedCategories.length > 0) {
      dispatch(fetchNotesByCategory(selectedCategories[0]))
        .unwrap()
        .then((res) => {
          setDisplayedNotes(res)
        })
    } else {
      setDisplayedNotes(showArchived ? archivedNotes : notes)
    }
  }, [dispatch, selectedCategories, showArchived, archivedNotes, notes])

  const handleDelete = (id: number) => {
    dispatch(deleteNote(id))
  }

  useEffect(() => {
    if (showArchived && archivedNotes.length === 0) {
      dispatch(fetchArchivedNotes())
    }
  }, [dispatch, showArchived, archivedNotes.length])

  const archivedTitle = showArchived ? 'Back to Notes' : 'Archived Notes'

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold text-slate-800">Notes</h1>
        <Button
          label={archivedTitle}
          icon="pi pi-folder"
          className="p-button-secondary"
          onClick={() => {
            setShowArchived(!showArchived)
          }}
        />
      </div>

      <div className="rounded-lg overflow-hidden">
        <DataTable value={displayedNotes} loading={loading} stripedRows>
          <Column field="title" header="Title" />
          <Column field="content" header="Content" />
          <Column
            style={{ width: '10%' }}
            body={(note: Note) => (
              <Button
                icon="pi pi-trash"
                className="p-button-danger p-button-rounded"
                onClick={() => handleDelete(note.id)}
                tooltip="Delete Note"
              />
            )}
          />
          <Column
            style={{ width: '10%' }}
            body={(note: Note) => (
              <Button
                icon="pi pi-pencil"
                className="p-button-rounded"
                onClick={() => {
                  dispatch(setCurrentNote(note))
                }}
                tooltip="Edit Note"
              />
            )}
          />
          <Column
            style={{ width: '10%' }}
            body={(note: Note) => (
              <Button
                tooltip="Toggle Archive"
                icon={note.archived ? 'pi pi-folder-open' : 'pi pi-folder'}
                className={
                  note.archived
                    ? 'p-button-success p-button-rounded'
                    : 'p-button-secondary p-button-rounded'
                }
                onClick={() => {
                  dispatch(toggleArchiveNote(note.id))
                }}
              />
            )}
          />
        </DataTable>
      </div>
    </div>
  )
}

export default NotesList
