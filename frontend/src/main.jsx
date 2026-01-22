import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// 1. In do cheezon ko import karna zaroori hai
import { BrowserRouter } from 'react-router-dom'; 
import { Toaster } from 'react-hot-toast';

import { Provider } from 'react-redux';
import { store } from './store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      
      {/* 2. Ye Wrapper lagana bohot zaroori hai */}
      <BrowserRouter>
        <App />
        <Toaster position="top-center" /> {/* Errors dikhane k liye */}
      </BrowserRouter>
      
    </Provider>
  </React.StrictMode>,
);