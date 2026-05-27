import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './commons-globals.css'
import App from './App.tsx'
import { initTheme } from '@/lib/commons/theme'

initTheme()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
