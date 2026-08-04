import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { telemetry } from './utils/telemetry.js'

// Initialize cookie-free telemetry tracking
telemetry.init();

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)

