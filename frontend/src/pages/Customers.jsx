import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomers, createCustomer, deleteCustomer, reset } from '../features/customers/customerSlice';
import { Plus, Trash2, Search, User } from 'lucide-react';
import toast from 'react-hot-toast';

const Customers = () => {
  const dispatch = useDispatch();
  
  // Redux se data nikalo
  const { customers, isLoading, isError, message } = useSelector((state) => state.customers);
  const { user } = useSelector((state) => state.auth);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', address: '' });

  useEffect(() => {
    if (isError) toast.error(message);
    if (!user) { /* Redirect logic here if needed */ }
    
    // Page load hote hi customers mangwa lo
    dispatch(getCustomers());

    return () => dispatch(reset());
  }, [user, isError, message, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createCustomer(formData));
    setFormData({ name: '', phone: '', email: '', address: '' });
    setShowModal(false);
    toast.success('Customer Added!');
  };

  return (
    <div className="w-full">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
            <h1 className="text-2xl font-bold text-gray-800">Customers</h1>
            <p className="text-sm text-gray-500">Manage your client list</p>
        </div>
        <button 
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-[#258C78] text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition"
        >
            <Plus size={20} /> Add Customer
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
                <tr>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Phone</th>
                    <th className="px-6 py-4">Address</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
                {customers.length > 0 ? (
                    customers.map((customer) => (
                        <tr key={customer._id} className="hover:bg-gray-50 transition">
                            <td className="px-6 py-4 font-medium text-gray-800 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center">
                                    <User size={16} />
                                </div>
                                {customer.name}
                            </td>
                            <td className="px-6 py-4 text-gray-600">{customer.phone}</td>
                            <td className="px-6 py-4 text-gray-600 truncate max-w-xs">{customer.address}</td>
                            <td className="px-6 py-4 text-right">
                                <button 
                                    onClick={() => dispatch(deleteCustomer(customer._id))}
                                    className="text-red-400 hover:text-red-600 p-2 rounded-full hover:bg-red-50 transition"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="4" className="text-center py-10 text-gray-400">No customers found. Add one!</td>
                    </tr>
                )}
            </tbody>
        </table>
      </div>

      {/* MODAL (Add Customer) */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
                <h2 className="text-xl font-bold mb-4 text-gray-800">Add New Customer</h2>
                <form onSubmit={onSubmit} className="space-y-4">
                    <input 
                        type="text" placeholder="Full Name" required 
                        className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                        value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                    <input 
                        type="text" placeholder="Phone Number" required 
                        className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                        value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                    <input 
                        type="email" placeholder="Email (Optional)" 
                        className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                        value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                    <textarea 
                        placeholder="Address" 
                        className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                        value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})}
                    ></textarea>
                    
                    <div className="flex gap-3 mt-6">
                        <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 text-gray-600 hover:bg-gray-100 rounded-lg font-medium">Cancel</button>
                        <button type="submit" className="flex-1 py-3 bg-[#258C78] text-white rounded-lg font-bold hover:bg-teal-700">Save Customer</button>
                    </div>
                </form>
            </div>
        </div>
      )}

    </div>
  );
};

export default Customers;