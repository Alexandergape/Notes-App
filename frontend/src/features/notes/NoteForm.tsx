import { useForm, Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../app/store'
import { setCurrentNote, setIsEditing, type Note } from './notesSlice'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { useEffect, useState } from 'react'
import { addNote, updateNote } from './notesApi'
import { fetchCategories } from '../categories/categoriesApi'
import { MultiSelect } from 'primereact/multiselect'

const NoteForm = () => {
  const dispatch = useDispatch<AppDispatch>()
  const form = useForm<Note>()
  const [acceptLabel, setAcceptLabel] = useState('Add Note')
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
    setAcceptLabel('Add Note')
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
      setAcceptLabel('Add Note')
    }
  }, [isEditing, currentNote])

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="p-4 flex flex-col gap-3 w-full max-w-md"
    >
      <h1 className="text-2xl font-bold">Note Form</h1>
      <Controller
        name="title"
        control={form.control}
        defaultValue=""
        rules={{ required: 'Title is required' }}
        render={({ field, fieldState }) => (
          <div className="flex flex-col">
            <InputText {...field} placeholder="Title" className="w-full" />
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
            <InputText {...field} placeholder="Content" className="w-full" />
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
            // options={categories.map((c) => ({ label: c.name, value: c.id }))}
            placeholder="Select categories"
            optionLabel="name"
            display="chip"
            className="w-full"
          />
        )}
      />

      <Button type="submit" label={acceptLabel} icon={isEditing ? 'pi pi-pencil' : 'pi pi-plus'} />
      <Button
        type="button"
        label="Cancel"
        onClick={handleCancel}
        icon="pi pi-times"
        className="p-button-secondary"
      />
    </form>
  )
}

export default NoteForm
