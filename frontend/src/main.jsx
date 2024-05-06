import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {AuthProvider} from "./context/AuthContext.jsx"
import { AuthProviderMed } from './context/AuthContextMed.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
    <AuthProvider>
    <AuthProviderMed>
      <App />
      </AuthProviderMed>
    </AuthProvider>
  </React.StrictMode>,
)
