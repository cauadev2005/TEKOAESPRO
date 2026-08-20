import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/global.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
