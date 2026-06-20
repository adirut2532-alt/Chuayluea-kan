import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppStateProvider } from './context/AppStateContext.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppStateProvider>
      <App />
    </AppStateProvider>
  </StrictMode>,
)
