import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Events from './context/Events.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Events>
      <App />
    </Events>
  </StrictMode>,
)
