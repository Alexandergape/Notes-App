import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../../app/store'
import { fetchCategories, deleteCategory } from './categoriesApi'
import CategoryForm from './CategoryForm'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import type { Category } from './categoriesSlice'

const CategoriesPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { categories, loading } = useSelector((state: RootState) => state.categories)

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  const handleDelete = (id: number) => {
    dispatch(deleteCategory(id))
  }

  return (
    <div className="">
      <div className="bg-white/60 border rounded-2xl p-4">
        <CategoryForm />
        <div className="mt-4">
          <DataTable
            value={categories}
            loading={loading}
            stripedRows
            className="rounded-lg overflow-hidden"
          >
            <Column field="name" header="Category" />
            <Column
              style={{ width: '10%' }}
              header="Actions"
              body={(category: Category) => (
                <Button
                  icon="pi pi-trash"
                  className="p-button-danger p-button-rounded"
                  onClick={() => handleDelete(category.id)}
                />
              )}
            />
          </DataTable>
        </div>
      </div>
    </div>
  )
}

export default CategoriesPage
