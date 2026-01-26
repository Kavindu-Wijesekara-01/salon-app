import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom' // 1. මේක Import කරන්න

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. App එක BrowserRouter එක ඇතුලේ දාන්න */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
