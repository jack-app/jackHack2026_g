import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Finish from './finish';
import './finish.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Finish />
  </StrictMode>,
)
