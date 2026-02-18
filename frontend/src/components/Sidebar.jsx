import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  // 👇 Ye purane icons hain
  LayoutDashboard, Users, Scissors, Ruler, FileText, 
  LogOut, Calendar, ChevronDown, ChevronRight, PieChart,
  ShoppingBag, 
  // 👇 Ye naye icons hain jo missing thay
  Settings, Layers, DollarSign, Bell 
} from 'lucide-react';
import { useDispatch } from 'react-redux';
// import { logout, reset } from '../features/auth/authSlice'; // Agar redux setup ha to uncomment karein

const Sidebar = ({ closeMobileMenu }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Dropdown States
  const [showStaffMenu, setShowStaffMenu] = useState(false);
  const [showOrderMenu, setShowOrderMenu] = useState(false); // New Order Menu
  const [showReportMenu, setShowReportMenu] = useState(true); // Default open rakh skty hain
  const [showConfigMenu, setShowConfigMenu] = useState(false);

  const onLogout = () => {
    // dispatch(logout());
    // dispatch(reset());
    localStorage.removeItem('userInfo'); // Simple logout logic
    navigate('/login');
    if (closeMobileMenu) closeMobileMenu();
  };

  // Common Link Style
  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all font-medium text-sm group ${
      isActive
        ? 'bg-[#258C78] text-white shadow-md'
        : 'text-gray-600 hover:bg-gray-50 hover:text-[#258C78]'
    }`;

  // ✅ MOBILE MENU FIX: Har link click par ye chalega
  const handleLinkClick = () => {
    if (closeMobileMenu) closeMobileMenu();
  };

  return (
    <div className="h-full w-full bg-white border-r border-gray-200 flex flex-col justify-between overflow-y-auto font-sans custom-scrollbar">
      
      {/* 1. HEADER (Balouch Tailors) */}
      <div className="h-16 flex items-center px-6 border-b border-gray-100 sticky top-0 bg-white z-10">
        <div className="flex items-center gap-2">
            {/* Agar logo image nahi ha to fallback text show hoga */}
            <div  className="w-8 h-8 bg-[#258C78] rounded-lg flex items-center justify-center text-white font-bold"><img src='logo.png'></img></div>
            <div>
                 <h1 className="text-lg font-bold text-[#258C78] leading-none">Balouch Tailors</h1>
                 <p className="text-[10px] text-gray-400 font-medium">Tailor Management System</p>
            </div>
        </div>
      </div>

      {/* 2. MENU */}
      <nav className="flex-1 px-3 space-y-1 mt-4 pb-4">
        
        {/* Dashboard */}
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
                    {/* <NavLink to="/roles" className="block px-4 py-2 text-[13px] text-gray-500 hover:text-[#258C78]" onClick={handleLinkClick}>
                        Roles
                    </NavLink> */}
                    <NavLink to="/karigars" className="block px-4 py-2 text-[13px] text-gray-500 hover:text-[#258C78]" onClick={handleLinkClick}>
                    Karigar Hisab & Work
                </NavLink>
                </div>
            )}
        </div>

        {/* Business Header */}
        <div className="px-4 mt-6 mb-2">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Business Management</p>
        </div>

        {/* Customer */}
        <NavLink to="/customers" className={linkClasses} onClick={handleLinkClick}>
            <Users size={18} />
            Customer
        </NavLink>

        {/* Measurement */}
        <NavLink to="/measurements" className={linkClasses} onClick={handleLinkClick}>
            <Ruler size={18} />
            Measurement
        </NavLink>

        {/* ✅ ORDER DROPDOWN (NEW FUNCTIONALITY) */}
        <div>
            <button 
                onClick={() => setShowOrderMenu(!showOrderMenu)}
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-[#258C78]"
            >
                <div className="flex items-center gap-3">
                    <Scissors size={18} /> {/* User preferred Scissors icon */}
                    Order
                </div>
                {showOrderMenu ? <ChevronDown size={14}/> : <ChevronRight size={14}/>}
            </button>

            {showOrderMenu && (
                <div className="ml-9 mt-1 space-y-1 border-l-2 border-gray-100 pl-2">
                    <NavLink to="/orders?tab=all" className="block px-4 py-2 text-[13px] text-gray-500 hover:text-[#258C78]" onClick={handleLinkClick}>
                        All Orders
                    </NavLink>
                    <NavLink to="/orders?tab=today_created" className="block px-4 py-2 text-[13px] text-gray-500 hover:text-[#258C78]" onClick={handleLinkClick}>
                        Today's Order
                    </NavLink>
                    <NavLink to="/orders?tab=today_delivery" className="block px-4 py-2 text-[13px] text-gray-500 hover:text-[#258C78]" onClick={handleLinkClick}>
                        Today Delivery
                    </NavLink>
                </div>
            )}
        </div>

        {/* Calendar */}
        <NavLink to="/calendar" className={linkClasses} onClick={handleLinkClick}>
            <Calendar size={18} />
            Calendar
        </NavLink>

        {/* Invoice */}
        <NavLink to="/invoices" className={linkClasses} onClick={handleLinkClick}>
            <FileText size={18} />
            Invoice
        </NavLink>

        {/* ✅ REPORTS DROPDOWN (NEW FUNCTIONALITY) */}
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
                    <NavLink to="/reports?tab=order" className="block px-4 py-2 text-[13px] text-gray-500 hover:text-[#258C78]" onClick={handleLinkClick}>
                        Order Report
                    </NavLink>
                    <NavLink to="/reports?tab=income" className="block px-4 py-2 text-[13px] text-gray-500 hover:text-[#258C78]" onClick={handleLinkClick}>
                        Income Report
                    </NavLink>
                    <NavLink to="/reports?tab=expense" className="block px-4 py-2 text-[13px] text-gray-500 hover:text-[#258C78]" onClick={handleLinkClick}>
                        Expense Report
                    </NavLink>
                    <NavLink to="/reports?tab=profit_loss" className="block px-4 py-2 text-[13px] text-gray-500 hover:text-[#258C78]" onClick={handleLinkClick}>
                        Year Profit Loss
                    </NavLink>
                </div>
            )}
        </div>
            <div className="px-4 mt-6 mb-2"><p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Settings</p></div>
        
        <div>
            <button onClick={() => setShowConfigMenu(!showConfigMenu)} className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-[#258C78]">
                <div className="flex items-center gap-3"><Settings size={18} /> Configuration</div>
                {showConfigMenu ? <ChevronDown size={14}/> : <ChevronRight size={14}/>}
            </button>
            {showConfigMenu && (
                <div className="ml-9 mt-1 space-y-1 border-l-2 border-gray-100 pl-2">
                    <NavLink to="/config/cloth-type" className="block px-4 py-2 text-[13px] text-gray-500 hover:text-[#258C78]" onClick={handleLinkClick}>
                        <div className="flex items-center gap-2"><Layers size={14}/> Cloth & Templates</div>
                    </NavLink>
                    <NavLink to="/config/karigar-rates" className="block px-4 py-2 text-[13px] text-gray-500 hover:text-[#258C78]" onClick={handleLinkClick}>
                        <div className="flex items-center gap-2"><DollarSign size={14}/> Karigar Rates</div>
                    </NavLink>
                    <NavLink to="/config/whatsapp" className="block px-4 py-2 text-[13px] text-gray-500 hover:text-[#258C78]" onClick={handleLinkClick}>
                        <div className="flex items-center gap-2"><Bell size={14}/> WhatsApp Notify</div>
                    </NavLink>
                </div>
            )}
        </div>
      </nav>

      {/* 3. FOOTER (Logout) */}
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