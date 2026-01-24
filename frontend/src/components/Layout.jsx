import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  // Sirf Mobile Menu k liye state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Mobile Menu ko band karne ka function
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="flex h-screen bg-[#F8F9FC] overflow-hidden">
      
      {/* =======================================
          1. MOBILE SIDEBAR OVERLAY (Andhera) 🌑
          (Jab mobile menu khulega, peeche kala parda aye)
      ======================================= */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={closeMobileMenu} // Andhere par click krne se menu band ho
        ></div>
      )}

      {/* =======================================
          2. SIDEBAR CONTAINER 📦
      ======================================= */}
      <div 
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:relative lg:translate-x-0 lg:shadow-none lg:z-auto`}
        // 👆 LOGIC:
        // Mobile: Agar Open hai to 'translate-x-0' (Samne ao), warna '-translate-x-full' (Screen se bahar jao)
        // Desktop (lg): Hamesha 'relative' aur 'translate-x-0' (Hamesha dikhao)
      >
        {/* Sidebar Component ko 'close' function pass kiya */}
        <Sidebar closeMobileMenu={closeMobileMenu} />
      </div>

      {/* =======================================
          3. MAIN CONTENT AREA 📄
      ======================================= */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Navbar: Toggle button yahan hai */}
        <Navbar toggleSidebar={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />

        {/* Page Content (Scrollable) */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
            <Outlet /> 
        </main>

      </div>
    </div>
  );
};

export default Layout;