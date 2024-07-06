import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Removed .tsx extension for consistency
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Combined import statements
import './index.css';
import Page2 from './Page2'; // Removed .tsx extension for consistency

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/page2" element={<Page2 />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);