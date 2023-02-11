import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { AuthContextProvider } from './context/user'
import { TileContextProvider } from './context/tile'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthContextProvider>
      <TileContextProvider>
        <App />
      </TileContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
