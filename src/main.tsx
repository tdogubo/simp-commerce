import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import App from './App.tsx'
import { AppProvider } from './context/AppContext.tsx'
import './index.css'
import Checkout from './pages/Checkout.tsx'

createRoot(document.getElementById('root')!).render(
  <>
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  </>,
)
