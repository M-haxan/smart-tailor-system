import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { Outlet, useLocation } from 'react-router-dom';

const Layout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  // Path ka naam saaf karne k liye (e.g. "/customers" -> "Customers")
  const getPageTitle = () => {
    const path = location.pathname.substring(1); // remove '/'
    if (!path) return 'Dashboard';
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  return (
    <div className="flex h-screen bg-[#F8F9FC] overflow-hidden font-sans">
      
      {/* 1. MOBILE OVERLAY */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden backdrop-blur-sm"
          onClick={closeMobileMenu}
        ></div>
      )}

      {/* 2. SIDEBAR (No Border, Clean Look) */}
      <div 
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-xl lg:shadow-none transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:relative lg:translate-x-0 lg:z-auto`}
      >
        <Sidebar closeMobileMenu={closeMobileMenu} />
      </div>

      {/* 3. MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#F8F9FC]">
        
        {/* Navbar */}
        <Navbar toggleSidebar={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />

        {/* ✅ NEW: BREADCRUMB BAR */}
        <div className="px-6 py-4 bg-[#F8F9FC] flex justify-between items-center">
            {/* Left: Current Page Name */}
            <h2 className="text-xl font-bold text-gray-800 tracking-tight">
                {getPageTitle()}
            </h2>

            {/* Right: Navigation Path */}
            <div className="text-sm text-gray-500 font-medium flex items-center gap-2">
                <span className="text-gray-400">Smart TMS</span>
                <span className="text-gray-300">/</span>
                <span className="text-[#258C78]">{getPageTitle()}</span>
            </div>
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto px-6 pb-6">
            <Outlet /> 
        </main>

      </div>
    </div>
  );
};

export default Layout;