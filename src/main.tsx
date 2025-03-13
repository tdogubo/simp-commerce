import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AppProvider } from './context/AppContext.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import Cart from './components/Cart.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/checkout" element={<Cart />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  </StrictMode>,
)
