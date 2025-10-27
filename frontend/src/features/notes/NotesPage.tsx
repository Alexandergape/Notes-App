import Header from '../../Header'
import CategoriesList from '../categories/CategoriesList'
import CategoriesPage from '../categories/CategoriesPage'
import NoteForm from './NoteForm'
import NotesList from './NotesList'

const NotesPage = () => {
  return (
    <div className="min-h-screen bg-amber-50 py-8">
      <Header />
      <main className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-6 gap-6">
        <section className="lg:col-span-2">
          <CategoriesPage />
        </section>

        <section className="lg:col-span-4">
          <div className="bg-white/40 border rounded-2xl p-6 shadow-sm backdrop-blur-sm">
            <CategoriesList />
            <NoteForm />
            <NotesList />
          </div>
        </section>
      </main>
    </div>
  )
}

export default NotesPage
