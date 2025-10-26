import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MultiSelect } from 'primereact/multiselect'
import type { AppDispatch, RootState } from '../../app/store'
import { fetchCategories } from './categoriesApi'
import { setSelectedCategories } from './categoriesSlice'

const CategoriesList = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { categories } = useSelector((state: RootState) => state.categories)
  const { selectedCategories } = useSelector((state: RootState) => state.categories)

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Categories</h2>
      <div className="mb-6">
        <MultiSelect
          value={selectedCategories}
          options={categories.map((c) => ({ label: c.name, value: c.id }))}
          onChange={(e) => dispatch(setSelectedCategories(e.value))}
          placeholder="Filter by categories"
          display="chip"
          className="w-full md:w-30rem"
          showClear
        />
      </div>
    </div>
  )
}

export default CategoriesList
