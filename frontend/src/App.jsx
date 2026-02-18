import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; // Toast notifications k liye

// Components
import Layout from './components/Layout';
import AuthPage from './pages/AuthPage';

// Pages
import Dashboard from './pages/Dashbord';
import Customers from './pages/Customers';
import Measurements from './pages/Measurements';          // ✅ Naya Page
import MeasurementSettings from './pages/MeasurementSettings'; // ✅ Naya Page
import Users from './pages/Users';
import Orders from './pages/Order';
import Invoices from './pages/Invoices';
import Reports from './pages/Reports';
import ConfigClothType from './pages/ConfigClothType';
import ConfigWhatsApp from './pages/ConfigWhatsApp';
import ConfigKarigarRates from './pages/ConfigKarigarRates';
import KarigarManager from './pages/KarigarManager';

function App() {
  return (
    <>
      {/* Toast Notification Container (Poori app me kahin bhi error aye to dikhe) */}
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />

      <Routes>
        
        {/* 1. Public Route (Login) */}
        <Route path="/login" element={<AuthPage />} />

        {/* 2. Protected Routes (Sidebar Wala Area) */}
        <Route path="/" element={<Layout />}>
            
            <Route index element={<Dashboard />} /> 
            
            {/* Business Routes */}
            <Route path="customers" element={<Customers />} />
            <Route path="users" element={<Users />} />
            <Route path="measurements" element={<Measurements />} /> 
            <Route path="/karigars" element={<KarigarManager />} />
            
            {/* Settings Route */}
            <Route path="settings" element={<MeasurementSettings />} /> 

            {/* Future Routes (Jo abhi banne hain) */}
            <Route path="orders" element={<Orders />} />
            <Route path="calendar" element={<div className='p-10 text-xl'>Calendar Coming Soon</div>} />
            <Route path="invoices" element={<Invoices />} />
            
            {/* Reports */}
            <Route path="reports" element={<Reports />} />
            {/* <Route path="reports/income" element={<div className='p-10 text-xl'>Income Report Coming Soon</div>} /> */}
        <Route path="/config/cloth-type" element={<ConfigClothType />} />
<Route path="/config/whatsapp" element={<ConfigWhatsApp />} />
<Route path="/config/karigar-rates" element={<ConfigKarigarRates />} />

        </Route>

      </Routes>
    </>
  );
}

export default App;