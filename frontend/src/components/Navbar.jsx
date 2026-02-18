import React from 'react';
import { AlignJustify, Languages, Settings, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // ✅ Import kiya

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate(); // ✅ Hook initialize kiya

  return (
    <header className="sticky top-0 z-40 w-full bg-white ">
      <div className="flex h-14 items-center justify-between px-4 lg:px-6">
        
        {/* LEFT: TOGGLE BUTTON */}
        <div className="flex items-center">
            <button 
                onClick={toggleSidebar}
                className="p-2 rounded-lg bg-teal-50 text-[#258C78] hover:bg-teal-100 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            >
                <AlignJustify size={20} strokeWidth={2.5} />
            </button>
        </div>

        {/* RIGHT: CONTROLS */}
        <div className="flex items-center gap-4">
            
            {/* Language Button (Dummy) */}
            <button className="hidden sm:flex p-2.5 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                <Languages size={20} />
            </button>

            {/* ✅ SETTINGS BUTTON (Ab ye kaam karega) */}
            <button 
                // onClick={() => navigate('/settings')} // Click par page badal jayega
                className="p-2.5 rounded-lg bg-teal-50 text-[#258C78] hover:bg-teal-100 transition-colors"
                title="Measurement Settings"
            >
                <Settings size={20} />
            </button>

            {/* Profile */}
            <div className="flex items-center gap-3 pl-1 pr-4 py-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-cursor cursor-pointer border border-gray-200">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm overflow-hidden">
                     <img 
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&auto=format&fit=crop&q=60" 
                        alt="Admin" 
                        className="w-full h-full object-cover"
                     />
                </div>
                <span className="text-sm font-semibold text-gray-700 hidden md:block">Admin</span>
            </div>

        </div>

      </div>
    </header>
  );
};

export default Navbar;