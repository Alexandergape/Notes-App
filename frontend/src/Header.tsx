import { useNavigate } from 'react-router-dom'
import { Button } from 'primereact/button'

const Header = () => {
  const navigate = useNavigate()

  const userName = localStorage.getItem('token')

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    navigate('/login')
  }

  return (
    <header className="w-full bg-indigo-50">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between gap-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-slate-700">{userName}</span>
            <span className="text-sm text-slate-500">Welcome back</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            label="Logout"
            icon="pi pi-sign-out"
            className="p-button-plain"
            onClick={handleLogout}
          />
        </div>
      </div>
    </header>
  )
}

export default Header
