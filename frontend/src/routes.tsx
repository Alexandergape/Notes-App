import { Routes, Route } from 'react-router-dom'
import NotesPage from './features/notes/NotesPage'
// import CategoriesPage from './features/categories/CategoriesPage'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<NotesPage />} />
      {/* // <Route path="/categories" element={<CategoriesPage />} /> */}
    </Routes>
  )
}

export default AppRoutes
