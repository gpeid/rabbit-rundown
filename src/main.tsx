import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import ActivitiesPage from './pages/ActivitiesPage.tsx'
import StatsPage from './pages/StatsPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path='/stats' element={<StatsPage />} />
        <Route path='/activities' element={<ActivitiesPage />} />
        {/* <Route path='/club' element={<StatsPage />} /> */}
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
