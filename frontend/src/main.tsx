import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { store } from './app/store'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

//
import 'primereact/resources/themes/saga-blue/theme.css' // Theme
import 'primereact/resources/primereact.min.css' // Core styles
import 'primeicons/primeicons.css' // Icons
import './index.css' // Tailwind

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
)
