import React, { useState } from 'react';
import { 
  Plus, Search, Edit, Trash2, 
  FileText, Copy, Columns, FileSpreadsheet,
  X, Save, Trash
} from 'lucide-react';

const Customers = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // 1. DUMMY DATA (Matching Screenshot)
  const customers = [
    { id: '#CUST-00013', name: 'MD Tariqul Alam', email: 'lcuyiel@gmail.com', phone: '050000000', city: 'yanbu al bahar', address: 'King Fhad Road Misrafa' },
    { id: '#CUST-00012', name: 'topup', email: 'farjan@gmail.com', phone: '01965421524', city: 'Mymensingh', address: 'farjan@gmail.com' },
    { id: '#CUST-00011', name: 'selvi', email: 'abc@gmail.com', phone: '9876543210', city: 'chennai', address: 'avadi' },
    { id: '#CUST-00010', name: 'Mohamed Abdirizak Ahmed', email: 'mohamed.gesei1@gmail.com', phone: '+252 61234567', city: 'Siinaay', address: 'Muqdisho Banaadir' },
  ];

  // Dynamic Measurement Rows
  const [measurements, setMeasurements] = useState([
    { part: 'Kameez Length', value: '', unit: 'Inch' },
    { part: 'Tera', value: '', unit: 'Inch' },
    { part: 'Chest', value: '', unit: 'Inch' }
  ]);

  const addMeasurementRow = () => {
    setMeasurements([...measurements, { part: '', value: '', unit: 'Inch' }]);
  };

  const removeMeasurementRow = (index) => {
    const list = [...measurements];
    list.splice(index, 1);
    setMeasurements(list);
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      
      {/* --- HEADER --- */}
      <div className="flex justify-between items-center h-12 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-sm  font-bold text-gray-800">Customer List</h1>
        <button 
            onClick={() => setShowModal(true)}
            className="bg-[#258C78] text-white text-sm h-8 px-4 py-2 rounded-lg font-bold shadow-sm hover:bg-teal-700 transition flex items-center gap-2"
        >
            <Plus size={12}/> Create Customer
        </button>
      </div>

      {/* --- TOOLBAR --- */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex ">
            <ToolButton icon={FileSpreadsheet} label="Excel" rounded="l" />
            <ToolButton icon={FileText} label="PDF" />
            <ToolButton icon={Copy} label="Copy" />
            <button className="flex items-center gap-2 bg-[#258C78] text-white px-3 py-1.5 text-sm font-medium rounded-r hover:bg-teal-700 transition">
                Column visibility <Columns size={14}/>
            </button>
        </div>
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

      {/* --- TABLE (Matching Screenshot) --- */}
      {/* --- TABLE (Wider Columns & No Text Splitting) --- */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto"> {/* Scrollbar ayega agar screen choti hui */}
            <table className="w-full text-left border-collapse">
                <thead className="bg-white border-b border-gray-200 text-gray-700 text-xs uppercase font-bold tracking-wider">
                    <tr>
                        {/* Fixed Widths for Headers */}
                        <th className="px-6 py-4 whitespace-nowrap w-24">ID</th>
                        <th className="px-6 py-4 whitespace-nowrap min-w-[220px]">Name</th>
                        <th className="px-6 py-4 whitespace-nowrap min-w-[200px]">Email</th>
                        <th className="px-6 py-4 whitespace-nowrap min-w-[150px]">Phone Number</th>
                        <th className="px-6 py-4 whitespace-nowrap min-w-[120px]">City</th>
                        <th className="px-6 py-4 whitespace-nowrap min-w-[250px]">Address</th>
                        <th className="px-6 py-4 whitespace-nowrap text-right">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                    {customers.map((cust) => (
                        <tr key={cust.id} className="hover:bg-gray-50 transition">
                            
                            {/* ID */}
                            <td className="px-6 py-4 text-[#258C78] text-xs whitespace-nowrap">
                                {cust.id}
                            </td>

                            {/* Name (With Avatar) */}
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center gap-3">
                                    <img 
                                        src={`https://ui-avatars.com/api/?name=${cust.name}&background=0D1117&color=fff`} 
                                        alt="" 
                                        className="w-6 h-6 rounded-full border border-gray-200"
                                    />
                                    <span className="text-xs text-gray-800">{cust.name}</span>
                                </div>
                            </td>

                            {/* Email */}
                            <td className="px-6 py-2 text-gray-600 whitespace-nowrap">
                                {cust.email}
                            </td>

                            {/* Phone */}
                            <td className="px-6 py-4 text-gray-600 whitespace-nowrap text-xs">
                                {cust.phone}
                            </td>

                            {/* City */}
                            <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                                <span className="px-2 py-1 bg-gray-100 rounded text-xs border border-gray-200">
                                    {cust.city}
                                </span>
                            </td>

                            {/* Address (Full Width show karega) */}
                            <td className="px-6 py-4 text-xs text-gray-500 whitespace-nowrap">
                                {cust.address}
                            </td>

                            {/* Actions */}
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                <div className="flex justify-end gap-2">
                                    <button className="p-2 border border-[#258C78] text-[#258C78] rounded hover:bg-[#258C78] hover:text-white transition">
                                        <Edit size={12}/>
                                    </button>
                                    <button className="p-2 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition">
                                        <Trash2 size={12}/>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
<div className="px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50/50">
            <p className="text-sm text-gray-500">
                Showing <span className="font-bold text-gray-800">1</span> to <span className="font-bold text-gray-800">{customers.length}</span> of <span className="font-bold text-gray-800">50</span> entries
            </p>
            
            <div className="flex border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                <button className="px-3 py-1.5 hover:bg-gray-50 border-r border-gray-200 text-gray-500 disabled:opacity-50">«</button>
                <button className="px-3 py-1.5 hover:bg-gray-50 border-r border-gray-200 text-gray-500 disabled:opacity-50">‹</button>
                
                <button className="px-4 py-1.5 bg-[#258C78] text-white font-medium border-r border-teal-600">1</button>
                <button className="px-4 py-1.5 hover:bg-gray-50 border-r border-gray-200 text-gray-600">2</button>
                <button className="px-4 py-1.5 hover:bg-gray-50 border-r border-gray-200 text-gray-600">3</button>
                
                <button className="px-3 py-1.5 hover:bg-gray-50 border-r border-gray-200 text-gray-500 disabled:opacity-50">›</button>
                <button className="px-3 py-1.5 hover:bg-gray-50 text-gray-500 disabled:opacity-50">»</button>
            </div>
        </div>
      {/* --- CREATE CUSTOMER + MEASUREMENT MODAL --- */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-5xl shadow-2xl animate-fade-in-up flex flex-col max-h-[90vh]">
                
                {/* Modal Header */}
                <div className="flex justify-between items-center p-5 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-gray-800">Create New Customer & Measurement</h2>
                    <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><X size={24}/></button>
                </div>

                {/* Modal Body (Scrollable) */}
                <div className="p-8 overflow-y-auto custom-scrollbar space-y-8">
                    
                    {/* SECTION 1: CUSTOMER CREATE */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Customer Create</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <InputGroup label="Name" placeholder="Enter name" required />
                             <InputGroup label="Email" placeholder="Enter email" required hasIcon/>
                             <InputGroup label="Password" placeholder="Enter password" type="password" />
                             <InputGroup label="Phone Number" placeholder="Enter phone number" required />
                             <InputGroup label="City" placeholder="Enter city" required />
                             
                             <div className="md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                <textarea rows="1" className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#258C78]"></textarea>
                             </div>
                             
                             <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                                <textarea rows="2" className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#258C78]"></textarea>
                             </div>
                        </div>
                    </div>
                    
                    {/* SECTION 2: MEASUREMENT CREATE */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Measurement Create</h3>
                        
                        {/* Measurement Header Info */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                            {/* Measurement ID */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Measurement Number</label>
                                <div className="flex">
                                    <span className="bg-gray-100 border border-r-0 border-gray-300 text-gray-500 px-3 py-2 rounded-l text-sm">#MSR-000</span>
                                    <input type="number" defaultValue="62" className="w-full border border-gray-300 rounded-r px-3 py-2 text-sm outline-none focus:border-[#258C78]"/>
                                </div>
                            </div>

                            {/* Date */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date <span className="text-red-500">*</span></label>
                                <input type="date" defaultValue="2026-01-25" className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#258C78]"/>
                            </div>

                            {/* Cloth Type */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Cloth Type <span className="text-red-500">*</span></label>
                                <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#258C78]">
                                    <option>Select Cloth Type</option>
                                    <option>Shalwar Kameez</option>
                                    <option>Pant Shirt</option>
                                    <option>Waistcoat</option>
                                </select>
                            </div>

                             {/* Responsible User */}
                             <div className="md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Responsible User</label>
                                <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#258C78]">
                                    <option>Select User</option>
                                    <option>Ustad Aslam</option>
                                    <option>Hafiz Ali</option>
                                </select>
                            </div>
                        </div>

                        {/* Dynamic Measurement Table */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Measurement Details</label>
                            <div className="border rounded-lg overflow-hidden">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50 text-xs uppercase font-bold text-gray-500">
                                        <tr>
                                            <th className="px-4 py-3">Type (Body Part)</th>
                                            <th className="px-4 py-3">Measurement</th>
                                            <th className="px-4 py-3">Unit</th>
                                            <th className="px-4 py-3 text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {measurements.map((item, index) => (
                                            <tr key={index}>
                                                <td className="px-4 py-2">
                                                    <input type="text" placeholder="e.g. Length" className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm" defaultValue={item.part}/>
                                                </td>
                                                <td className="px-4 py-2">
                                                    <input type="text" placeholder="0.00" className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm"/>
                                                </td>
                                                <td className="px-4 py-2">
                                                    <select className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm">
                                                        <option>Inch</option>
                                                        <option>CM</option>
                                                        <option>Meter</option>
                                                    </select>
                                                </td>
                                                <td className="px-4 py-2 text-right">
                                                    <button onClick={() => removeMeasurementRow(index)} className="text-red-500 hover:bg-red-50 p-1 rounded"><Trash size={16}/></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="p-2 bg-gray-50 border-t flex justify-center">
                                    <button onClick={addMeasurementRow} className="text-[#258C78] text-sm font-bold hover:underline flex items-center gap-1">
                                        <Plus size={14}/> Add New Line
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

                {/* Modal Footer */}
                <div className="p-5 border-t border-gray-100 flex justify-end gap-3 bg-gray-50 rounded-b-lg">
                    <button onClick={() => setShowModal(false)} className="px-6 py-2 rounded border border-gray-300 text-gray-700 font-medium hover:bg-gray-100">
                        Cancel
                    </button>
                    <button className="bg-[#258C78] text-white px-6 py-2 rounded font-bold shadow-sm hover:bg-teal-700 flex items-center gap-2">
                        <Save size={18}/> Create
                    </button>
                </div>

            </div>
        </div>
      )}

    </div>
  );
};

// --- Helper Components ---
const ToolButton = ({ icon: Icon, label, rounded }) => (
    <button className={`flex items-center gap-1 bg-[#258C78] text-white px-3 py-1.5 text-sm font-medium border-r border-teal-600 hover:bg-teal-700 transition ${rounded === 'l' ? 'rounded-l' : ''}`}>
        {label}
    </button>
);

const InputGroup = ({ label, placeholder, required, type = "text", hasIcon }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="relative">
            <input 
                type={type} 
                placeholder={placeholder} 
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#258C78]"
            />
            {hasIcon && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-teal-600 bg-teal-50 px-1 rounded text-xs font-bold">
                    ✉
                </span>
            )}
        </div>
    </div>
);

export default Customers;