import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { SignedInContextProvider } from './context/SignedInContext';
import { SignUpContextProvider } from './context/SignUpContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <SignedInContextProvider>
    <SignUpContextProvider>
      <App />
    </SignUpContextProvider>
  </SignedInContextProvider>
);
