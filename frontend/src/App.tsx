import { Toast } from 'primereact/toast'
import './App.css'
import AppRoutes from './routes'
import { useEffect, useRef } from 'react'
import { api } from './api/api'

function App() {
  const toast = useRef<Toast>(null)

  useEffect(() => {
    api.toast = toast
  }, [])

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white">
      <Toast ref={toast} position="top-right" />
      <AppRoutes />
    </div>
  )
}

export default App
