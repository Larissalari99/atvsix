import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Menu from './Menu.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Menu />
  </StrictMode>
)
