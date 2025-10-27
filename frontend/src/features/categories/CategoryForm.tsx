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
    <div className="bg-white/60 border rounded-xl p-4 mb-4">
      <h2 className="text-lg font-medium text-slate-700 mb-3">Add Category</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="items-center gap-3 grid grid-cols-6">
        <InputText
          {...register('name', { required: true })}
          placeholder="New category"
          className="w-full p-3 rounded-lg col-span-4"
        />
        <Button
          label="Add"
          icon="pi pi-plus"
          type="submit"
          className="p-button-rounded p-button-success col-span-2"
        />
      </form>
    </div>
  )
}

export default CategoryForm
