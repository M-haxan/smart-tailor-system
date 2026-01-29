import React, { useState } from 'react';
import { 
  Plus, Search, Edit, Trash2, 
  FileText, Copy, Columns, FileSpreadsheet,
  X, Upload
} from 'lucide-react';

const Users = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Dummy Data for Table
  const users = [
    { id: 1, name: 'HARI', email: 'hari@gmail.com', role: 'Manager', phone: '+92 300 1234567', img: null },
    { id: 2, name: 'Employee', email: 'employee@gmail.com', role: 'Karigar', phone: '+81 3 1234 5678', img: null },
    { id: 3, name: 'Manager', email: 'manager@gmail.com', role: 'Manager', phone: '0300 9876543', img: null },
  ];

  // Form State
  const [formData, setFormData] = useState({
    role: '', name: '', email: '', password: '', phone: '', photo: null
  });

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      
      {/* 1. HEADER */}
      <div className="flex justify-between h-12 items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-sm font-bold text-gray-800">User List</h1>
        <button 
            onClick={() => setShowModal(true)}
            className="bg-[#258C78] h-8 text-white text-sm px-4 py-2 rounded-lg font-bold shadow-sm hover:bg-teal-700 transition flex items-center gap-2"
        >
            <Plus size={12}/> Create User
        </button>
      </div>

      {/* 2. TOOLBAR & SEARCH */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Left: Action Buttons (Excel, PDF...) */}
        <div className="flex  ">
            <ToolButton icon={FileSpreadsheet} label="Excel" />
            <ToolButton icon={FileText} label="PDF" />
            <ToolButton icon={Copy} label="Copy" />
            <button className="flex items-center gap-2 bg-[#258C78] text-white px-3 py-1.5 text-sm font-sm rounded-r  hover:bg-teal-700 transition">
                Column visibility <Columns size={10}/>
            </button>
        </div>

        {/* Right: Search */}
        <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Search:</span>
            <input 
                type="text" 
                className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:ring-1 focus:ring-[#258C78] outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
      </div>

      {/* 3. TABLE */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead className="bg-white border-b border-gray-200 text-gray-700 text-xs uppercase font-bold tracking-wider">
                    <tr>
                        <th className="px-6 py-2">User Profile</th>
                        <th className="px-6 py-2">Email</th>
                        <th className="px-6 py-2">Assign Role</th>
                        <th className="px-6 py-2">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                    {users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50 transition">
                            
                            {/* User Profile (Photo + Name + Phone) */}
                            <td className="px-6 py-2">
                                <div className="flex items-center gap-3">
                                    {/* Avatar Image */}
                                    <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden border border-gray-200">
                                        <img 
                                            src={`https://ui-avatars.com/api/?name=${user.name}&background=258C78&color=fff`} 
                                            alt="profile" 
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    {/* Name & Phone */}
                                    <div>
                                        <p className="font-bold text-sm text-gray-800">{user.name}</p>
                                        <p className="text-xs text-gray-500">{user.phone}</p>
                                    </div>
                                </div>
                            </td>

                            {/* Email */}
                            <td className="px-6 py-2 text-gray-600">{user.email}</td>

                            {/* Role */}
                            <td className="px-6 py-2">
                                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium border border-gray-200">
                                    {user.role}
                                </span>
                            </td>

                            {/* Actions */}
                            <td className="px-6 py-2">
                                <div className="flex gap-2">
                                    <button className="p-1.5 border border-[#258C78] text-[#258C78] rounded hover:bg-[#258C78] hover:text-white transition">
                                        <Edit size={12}/>
                                    </button>
                                    <button className="p-1.5 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition">
                                        <Trash2 size={12}/>
                                    </button>
                                </div>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
            <p>Showing 1 to 3 of 3 entries</p>
            <div className="flex border rounded overflow-hidden">
                <button className="px-3 py-1 border-r hover:bg-gray-50">«</button>
                <button className="px-3 py-1 border-r hover:bg-gray-50">‹</button>
                <button className="px-3 py-1 bg-[#258C78] text-white">1</button>
                <button className="px-3 py-1 border-r hover:bg-gray-50">›</button>
                <button className="px-3 py-1 hover:bg-gray-50">»</button>
            </div>
        </div>
      </div>

      {/* 4. CREATE USER MODAL (Popup) */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-2xl shadow-2xl animate-fade-in-up">
                
                {/* Modal Header */}
                <div className="flex justify-between items-center p-5 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-gray-800">Create User</h2>
                    <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                        <X size={24} />
                    </button>
                </div>
                
                {/* Modal Body (Form) */}
                <form className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Assign Role */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Assign Role <span className="text-red-500">*</span></label>
                        <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-1 focus:ring-[#258C78] outline-none">
                            <option>Select Role</option>
                            <option value="manager">Manager</option>
                            <option value="worker">Karigar (Worker)</option>
                            <option value="helper">Helper</option>
                        </select>
                    </div>

                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name <span className="text-red-500">*</span></label>
                        <input type="text" placeholder="Enter Name" className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-1 focus:ring-[#258C78] outline-none"/>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email <span className="text-red-500">*</span></label>
                        <input type="email" placeholder="Enter email" className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-1 focus:ring-[#258C78] outline-none"/>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password <span className="text-red-500">*</span></label>
                        <input type="password" placeholder="Enter password" className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-1 focus:ring-[#258C78] outline-none"/>
                    </div>

                    {/* Phone Number */}
                    <div className="md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input type="text" placeholder="Enter phone number" className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-1 focus:ring-[#258C78] outline-none"/>
                        <p className="text-[10px] text-gray-400 mt-1">Please enter the number with country code. e.g., +923001234567</p>
                    </div>
                    <div className="md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                        <textarea type="text-area" placeholder="Enter Address" className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-1 focus:ring-[#258C78] outline-none"/>
                        <p className="text-[10px] text-gray-400 mt-1">Please enter the Address</p>
                    </div>
                    {/* Profile Photo Upload */}
                    <div className="md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Profile</label>
                        <div className="flex items-center">
                            <label className="cursor-pointer bg-gray-100 border border-r-0 border-gray-300 text-gray-700 px-3 py-2 rounded-l text-sm hover:bg-gray-200">
                                Choose File
                                <input type="file" className="hidden" />
                            </label>
                            <span className="border border-gray-300 px-3 py-2 rounded-r text-sm text-gray-500 bg-white flex-1 truncate">
                                No file chosen
                            </span>
                        </div>
                    </div>

                </form>

                {/* Modal Footer */}
                <div className="p-5 border-t border-gray-100 flex justify-end">
                    <button className="bg-[#258C78] text-white px-6 py-2 rounded-lg font-bold shadow-sm hover:bg-teal-700 transition">
                        Create
                    </button>
                </div>
            </div>
        </div>
      )}

    </div>
  );
};

// Helper Component for Toolbar Buttons
const ToolButton = ({ icon: Icon, label }) => (
    <button className="flex items-center gap-1 bg-[#258C78] text-white px-3 py-1.5 text-sm font-medium first:rounded-l last:rounded-r border-r border-teal-600 hover:bg-teal-700 transition">
        {label}
    </button>
);

export default Users;