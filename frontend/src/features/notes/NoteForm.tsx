import { useForm, Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../app/store'
import { setCurrentNote, setIsEditing, type Note } from './notesSlice'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { useEffect, useState } from 'react'
import { addNote, updateNote, fetchNotes } from './notesApi'
import { fetchCategories } from '../categories/categoriesApi'
import { MultiSelect } from 'primereact/multiselect'

const NoteForm = () => {
  const dispatch = useDispatch<AppDispatch>()
  const form = useForm<Note>()

  const ADD_NOTE = 'Add Note'
  const [acceptLabel, setAcceptLabel] = useState(ADD_NOTE)
  const { isEditing, currentNote } = useSelector((state: RootState) => state.notes)
  const { categories } = useSelector((state: RootState) => state.categories)

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  const onSubmit = (data: Note) => {
    if (isEditing && currentNote) {
      // Update existing note
      dispatch(
        updateNote({
          ...currentNote,
          ...data,
          categoryIds: data.categories?.map((c) => Number(c.id)) || []
        })
      )
    } else {
      dispatch(
        addNote({
          ...data,
          categoryIds: data.categories?.map((c) => Number(c.id)) || []
        })
      )
    }
    form.reset()
  }

  const handleCancel = () => {
    form.reset()
    setAcceptLabel(ADD_NOTE)
    dispatch(setCurrentNote(null))
    dispatch(setIsEditing(false))
  }

  useEffect(() => {
    if (isEditing) {
      setAcceptLabel('Update Note')

      form.setValue('title', currentNote?.title || '')
      form.setValue('content', currentNote?.content || '')
      form.setValue('categories', currentNote?.categories || [])
    } else {
      setAcceptLabel(ADD_NOTE)
    }
  }, [isEditing, currentNote, form])

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="p-4 flex flex-col gap-4 w-full">
      <div className="flex items-center justify-between w-full">
        <h1 className="text-xl font-semibold text-slate-800">Create / Edit Note</h1>
        <Button
          icon="pi pi-refresh"
          className="p-button-secondary p-button-rounded"
          onClick={(e) => {
            e.preventDefault()
            dispatch(fetchNotes())
            dispatch(fetchCategories())
          }}
          tooltip="Refresh Notes"
        />
      </div>
      <Controller
        name="title"
        control={form.control}
        defaultValue=""
        rules={{ required: 'Title is required' }}
        render={({ field, fieldState }) => (
          <div className="flex flex-col">
            <InputText {...field} placeholder="Title" className="w-full p-3 rounded-lg shadow-sm" />
            {fieldState.error && (
              <span className="text-red-500 text-sm mt-1">{fieldState.error.message}</span>
            )}
          </div>
        )}
      />

      <Controller
        name="content"
        control={form.control}
        defaultValue=""
        rules={{ required: 'Content is required' }}
        render={({ field, fieldState }) => (
          <div className="flex flex-col">
            <InputText
              {...field}
              placeholder="Content"
              className="w-full p-3 rounded-lg shadow-sm"
            />
            {fieldState.error && (
              <span className="text-red-500 text-sm mt-1">{fieldState.error.message}</span>
            )}
          </div>
        )}
      />
      <Controller
        name="categories"
        control={form.control}
        render={({ field }) => (
          <MultiSelect
            {...field}
            options={categories}
            placeholder="Select categories"
            optionLabel="name"
            display="chip"
            className="w-full"
          />
        )}
      />

      <div className="flex gap-3">
        <Button
          type="submit"
          label={acceptLabel}
          icon={isEditing ? 'pi pi-pencil' : 'pi pi-plus'}
          className="p-button-primary"
        />
        <Button
          type="button"
          label="Cancel"
          onClick={handleCancel}
          icon="pi pi-times"
          className="p-button-secondary"
        />
      </div>
    </form>
  )
}

export default NoteForm
