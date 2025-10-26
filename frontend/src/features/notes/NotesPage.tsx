import CategoriesList from '../categories/CategoriesList'
import CategoriesPage from '../categories/CategoriesPage'
import NoteForm from './NoteForm'
import NotesList from './NotesList'

const NotesPage = () => {
  return (
    <div className="p-4 flex flex-col gap-4">
      <CategoriesPage />
      <CategoriesList />

      <NoteForm />
      <NotesList />
    </div>
  )
}

export default NotesPage
