import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getStaff, createStaff, deleteStaff } from '../features/staff/staffSlice'; // Import actions
import { toast } from 'react-hot-toast'; // Alerts ke liye
import { 
  Plus, Search, Edit, Trash2, 
  FileText, Copy, Columns, FileSpreadsheet,
  X, Upload
} from 'lucide-react';

const Users = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Form State
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', phone: '', role: 'Karigar'
  });

  const dispatch = useDispatch();
  
  // Redux se data nikalo
  const { staffList, isLoading, isError, message } = useSelector((state) => state.staff);

  // Page load hote hi data fetch karo
  useEffect(() => {
    if (isError) {
      toast.error(message);
      console.error("Error fetching staff:", message);
    }
    dispatch(getStaff()); // Backend call
  }, [isError, message, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createStaff(formData)); // Backend ko data bhejo
    setShowModal(false);
    toast.success('User created successfully!');
    setFormData({ name: '', email: '', password: '', phone: '', role: 'Karigar' }); // Reset form
  };

  const handleDelete = (id) => {
    if(window.confirm('Are you sure you want to delete this user?')) {
        dispatch(deleteStaff(id));
        toast.success('User deleted');
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      
      {/* HEADER */}
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-xl font-bold text-gray-800">Staff Management</h1>
        <button 
            onClick={() => setShowModal(true)}
            className="bg-[#258C78] text-white px-4 py-2 rounded-lg font-bold shadow-sm hover:bg-teal-700 transition flex items-center gap-2"
        >
            <Plus size={18}/> Create User
        </button>
      </div>

      {/* TABLE (Real Data) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        
        {isLoading ? <p className="p-5 text-center">Loading staff data...</p> : (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead className="bg-white border-b border-gray-200 text-gray-700 text-xs uppercase font-bold tracking-wider">
                    <tr>
                        <th className="px-6 py-4">User Profile</th>
                        <th className="px-6 py-4">Email</th>
                        <th className="px-6 py-4">Role</th>
                        <th className="px-6 py-4">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                    {staffList.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase())).map((user) => (
                        <tr key={user._id} className="hover:bg-gray-50 transition">
                            
                            <td className="px-6 py-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden border border-gray-200">
                                        {/* Avatar Logic */}
                                        <img 
                                            src={user.pic || `https://ui-avatars.com/api/?name=${user.name}&background=258C78&color=fff`} 
                                            alt="profile" 
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-800">{user.name}</p>
                                        <p className="text-xs text-gray-500">{user.phone}</p>
                                    </div>
                                </div>
                            </td>

                            <td className="px-6 py-3 text-gray-600">{user.email}</td>

                            <td className="px-6 py-3">
                                <span className={`px-2 py-1 rounded text-xs font-medium border ${user.role === 'Manager' ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-gray-100 text-gray-700 border-gray-200'}`}>
                                    {user.role}
                                </span>
                            </td>

                            <td className="px-6 py-3">
                                <div className="flex gap-2">
                                    <button onClick={() => handleDelete(user._id)} className="p-1.5 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition">
                                        <Trash2 size={16}/>
                                    </button>
                                </div>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        )}
      </div>

      {/* CREATE USER MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-2xl shadow-2xl animate-fade-in-up">
                
                <div className="flex justify-between items-center p-5 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-gray-800">Create User</h2>
                    <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
                </div>
                
                <form onSubmit={onSubmit} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input name="name" value={formData.name} onChange={onChange} type="text" className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#258C78]" required/>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input name="email" value={formData.email} onChange={onChange} type="email" className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#258C78]" required/>
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input name="phone" value={formData.phone} onChange={onChange} type="text" className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#258C78]"/>
                    </div>

                    {/* Role */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Assign Role</label>
                        <select name="role" value={formData.role} onChange={onChange} className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#258C78]">
                            <option value="Manager">Manager</option>
                            <option value="Karigar">Karigar (Worker)</option>
                            <option value="Helper">Helper</option>
                        </select>
                    </div>

                    {/* Password */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input name="password" value={formData.password} onChange={onChange} type="password" className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#258C78]" required/>
                    </div>

                    <div className="md:col-span-2 flex justify-end gap-3 mt-4">
                        <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded hover:bg-gray-50">Cancel</button>
                        <button type="submit" className="bg-[#258C78] text-white px-6 py-2 rounded-lg font-bold shadow-sm hover:bg-teal-700">Create</button>
                    </div>

                </form>
            </div>
        </div>
      )}

    </div>
  );
};

export default Users;