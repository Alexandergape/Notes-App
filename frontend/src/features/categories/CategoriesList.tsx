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
    <div className="bg-white/50 border rounded-xl p-4 mb-6 shadow-sm">
      <h2 className="text-lg font-medium mb-3 text-slate-700">Categories</h2>
      <div className='w-full'>
        <MultiSelect
          value={selectedCategories}
          options={categories.map((c) => ({ label: c.name, value: c.id }))}
          onChange={(e) => dispatch(setSelectedCategories(e.value))}
          placeholder="Filter by categories"
          display="chip"
          className="w-full"
          showClear
        />
      </div>
    </div>
  )
}

export default CategoriesList
