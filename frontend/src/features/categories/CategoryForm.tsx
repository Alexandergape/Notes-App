import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../../app/store'
import { createCategory } from './categoriesApi'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'

interface CategoryFormData {
  name: string
}

const CategoryForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { register, handleSubmit, reset } = useForm<CategoryFormData>()

  const onSubmit = (data: CategoryFormData) => {
    dispatch(createCategory(data.name))
    reset()
  }

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Category Form</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-2 mb-4">
        <InputText
          {...register('name', { required: true })}
          placeholder="New category"
          className="p-inputtext-sm"
        />
        <Button label="Add" icon="pi pi-plus" type="submit" />
      </form>
    </>
  )
}

export default CategoryForm
