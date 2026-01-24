import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Scissors, Ruler, FileText, 
  LogOut, Calendar, ChevronDown, ChevronRight, PieChart 
} from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';

// 👇 Yahan prop receive karein
const Sidebar = ({ closeMobileMenu }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showStaffMenu, setShowStaffMenu] = useState(false);
  const [showReportMenu, setShowReportMenu] = useState(false);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/login');
  };

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all font-medium text-sm group ${
      isActive
        ? 'bg-[#258C78] text-white shadow-md'
        : 'text-gray-600 hover:bg-gray-50 hover:text-[#258C78]'
    }`;

  // 👇 Ye chota function banaya jo Link click hone par chalega
  const handleLinkClick = () => {
    // Agar mobile menu ka function mila hai to chalao (Desktop pr ye null hoga)
    if (closeMobileMenu) closeMobileMenu();
  };

  return (
    <div className="h-full w-full bg-white border-r border-gray-200 flex flex-col justify-between overflow-y-auto font-sans">
      
      {/* HEADER */}
      <div className="h-16 flex items-center px-6 border-b border-gray-100 sticky top-0 bg-white z-10">
        <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
            <div>
                 <h1 className="text-lg font-bold text-[#258C78] leading-none">Balouch Tailors</h1>
                 <p className="text-[10px] text-gray-400 font-medium">Tailor Management System</p>
            </div>
        </div>
      </div>

      {/* MENU */}
      <nav className="flex-1 px-3 space-y-1 mt-4 pb-4">
        
        {/* Dashboard Link - 👇 onClick add kiya */}
        <NavLink to="/" className={linkClasses} onClick={handleLinkClick}>
            <LayoutDashboard size={18} />
            Dashboard
        </NavLink>

        {/* Staff Management Dropdown */}
        <div>
            <button 
                onClick={() => setShowStaffMenu(!showStaffMenu)}
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-[#258C78]"
            >
                <div className="flex items-center gap-3">
                    <Users size={18} />
                    Staff Management
                </div>
                {showStaffMenu ? <ChevronDown size={14}/> : <ChevronRight size={14}/>}
            </button>

            {showStaffMenu && (
                <div className="ml-9 mt-1 space-y-1 border-l-2 border-gray-100 pl-2">
                    <NavLink to="/users" className="block px-4 py-2 text-[13px] text-gray-500 hover:text-[#258C78]" onClick={handleLinkClick}>
                        Users
                    </NavLink>
                    <NavLink to="/roles" className="block px-4 py-2 text-[13px] text-gray-500 hover:text-[#258C78]" onClick={handleLinkClick}>
                        Roles
                    </NavLink>
                </div>
            )}
        </div>

        {/* Business Header */}
        <div className="px-4 mt-6 mb-2">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Business Management</p>
        </div>

        {/* Other Links - 👇 Sab mein onClick add kiya */}
        <NavLink to="/customers" className={linkClasses} onClick={handleLinkClick}>
            <Users size={18} />
            Customer
        </NavLink>

        <NavLink to="/measurements" className={linkClasses} onClick={handleLinkClick}>
            <Ruler size={18} />
            Measurement
        </NavLink>

        <NavLink to="/orders" className={linkClasses} onClick={handleLinkClick}>
            <Scissors size={18} />
            Order
        </NavLink>

        <NavLink to="/calendar" className={linkClasses} onClick={handleLinkClick}>
            <Calendar size={18} />
            Calendar
        </NavLink>

        <NavLink to="/invoices" className={linkClasses} onClick={handleLinkClick}>
            <FileText size={18} />
            Invoice
        </NavLink>

        {/* Reports Dropdown */}
        <div>
            <button 
                onClick={() => setShowReportMenu(!showReportMenu)}
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-[#258C78]"
            >
                <div className="flex items-center gap-3">
                    <PieChart size={18} />
                    Report
                </div>
                {showReportMenu ? <ChevronDown size={14}/> : <ChevronRight size={14}/>}
            </button>

            {showReportMenu && (
                <div className="ml-9 mt-1 space-y-1 border-l-2 border-gray-100 pl-2">
                    <NavLink to="/reports/order" className="block px-4 py-2 text-[13px] text-gray-500 hover:text-[#258C78]" onClick={handleLinkClick}>
                        Order Report
                    </NavLink>
                    <NavLink to="/reports/income" className="block px-4 py-2 text-[13px] text-gray-500 hover:text-[#258C78]" onClick={handleLinkClick}>
                        Income Report
                    </NavLink>
                </div>
            )}
        </div>

      </nav>

      {/* FOOTER */}
      <div className="p-4 border-t border-gray-100 bg-white sticky bottom-0">
         <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-2.5 text-red-500 hover:bg-red-50 rounded-lg transition-all font-medium text-sm">
            <LogOut size={18} />
            Logout
        </button>
      </div>

    </div>
  );
};

export default Sidebar;