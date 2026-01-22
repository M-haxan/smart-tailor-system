import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage'; // Path check kar lena

function App() {
  return (
    <Routes>
      {/* Login Page ko default route ('/') bana diya */}
      <Route path="/" element={<AuthPage />} />
      <Route path="/login" element={<AuthPage />} />
    </Routes>
  );
}

export default App;