import React, { useState } from 'react';
import { 
  Plus, Search, Edit, Trash2, Eye,
  FileText, Copy, Columns, FileSpreadsheet,
  X, Save, Trash, Calendar
} from 'lucide-react';

const Measurements = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // State for Form logic
  const [selectedCloth, setSelectedCloth] = useState('');
  
  // 1. DUMMY CUSTOMERS (Dropdown k liye)
  const customerList = [
    { id: 1, name: 'MD Tariqul Alam', phone: '050000000' },
    { id: 2, name: 'Topup', phone: '01965421524' },
    { id: 3, name: 'Selvi', phone: '9876543210' },
    { id: 4, name: 'John Smith', phone: '+1 (861) 623-4643' },
  ];

  // 2. CLOTH TEMPLATES (Auto-Fill Logic)
  // Jab user Type select karega, ye fields khud aa jayengi
  const templates = {
    'Shalwar Kameez': [
        { part: 'Length (Kameez)', value: '', unit: 'Inch' },
        { part: 'Tera (Shoulder)', value: '', unit: 'Inch' },
        { part: 'Chest (Chaati)', value: '', unit: 'Inch' },
        { part: 'Waist (Kamar)', value: '', unit: 'Inch' },
        { part: 'Sleeve (Bazu)', value: '', unit: 'Inch' },
        { part: 'Collar', value: '', unit: 'Inch' },
        { part: 'Shalwar Length', value: '', unit: 'Inch' },
        { part: 'Paincha', value: '', unit: 'Inch' },
    ],
    'Pant Shirt': [
        { part: 'Shirt Length', value: '', unit: 'Inch' },
        { part: 'Shoulder', value: '', unit: 'Inch' },
        { part: 'Chest', value: '', unit: 'Inch' },
        { part: 'Sleeve', value: '', unit: 'Inch' },
        { part: 'Pant Length', value: '', unit: 'Inch' },
        { part: 'Waist', value: '', unit: 'Inch' },
        { part: 'Hips', value: '', unit: 'Inch' },
    ],
    'Waistcoat': [
        { part: 'Length', value: '', unit: 'Inch' },
        { part: 'Shoulder', value: '', unit: 'Inch' },
        { part: 'Chest', value: '', unit: 'Inch' },
        { part: 'Waist', value: '', unit: 'Inch' },
    ]
  };

  // Default empty rows
  const [measureDetails, setMeasureDetails] = useState([]);

  // Handle Cloth Selection
  const handleClothChange = (e) => {
      const type = e.target.value;
      setSelectedCloth(type);
      if (templates[type]) {
          setMeasureDetails(templates[type]); // Load Template
      } else {
          setMeasureDetails([]); // Clear if nothing selected
      }
  };

  // Add/Remove Rows Manually
  const addRow = () => setMeasureDetails([...measureDetails, { part: '', value: '', unit: 'Inch' }]);
  const removeRow = (idx) => {
    const list = [...measureDetails];
    list.splice(idx, 1);
    setMeasureDetails(list);
  };

  // Dummy Table Data
  const measurements = [
    { id: '#MSR-00061', customer: 'John Smith', date: 'Jan 18, 2026', cloth: 'Shalwar Kameez', responsible: 'Manager' },
    { id: '#MSR-00060', customer: 'Jack smith', date: 'Jan 16, 2026', cloth: 'Pant Shirt', responsible: 'Employee' },
    { id: '#MSR-00059', customer: 'MD Tariqul Alam', date: 'Jan 16, 2026', cloth: 'Waistcoat', responsible: 'Employee' },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      
      {/* HEADER */}
      <div className="flex justify-between h-12 items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-sm font-bold text-gray-800">Measurement List</h1>
        <button 
            onClick={() => setShowModal(true)}
            className="bg-[#258C78] text-white h-8 px-4 py-2 rounded-lg font-bold shadow-sm hover:bg-teal-700 transition flex items-center gap-2"
        >
            <Plus size={12}/> Create Measurement
        </button>
      </div>

      {/* TOOLBAR */}
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

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead className="bg-white border-b border-gray-200 text-gray-700 text-xs uppercase font-bold tracking-wider">
                    <tr>
                        <th className="px-6 py-4 whitespace-nowrap">ID</th>
                        <th className="px-6 py-4 whitespace-nowrap min-w-[200px]">Customer</th>
                        <th className="px-6 py-4 whitespace-nowrap">Date</th>
                        <th className="px-6 py-4 whitespace-nowrap">Cloth Type</th>
                        <th className="px-6 py-4 whitespace-nowrap">Responsible</th>
                        <th className="px-6 py-4 whitespace-nowrap text-right">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                    {measurements.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50 transition">
                            <td className="px-6 py-4 text-gray-600 font-medium whitespace-nowrap">{item.id}</td>
                            <td className="px-6 py-4 text-gray-800 font-semibold whitespace-nowrap">{item.customer}</td>
                            <td className="px-6 py-4 text-gray-600 whitespace-nowrap">{item.date}</td>
                            <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                                <span className="px-2 py-1 bg-gray-100 border border-gray-200 rounded text-xs">{item.cloth}</span>
                            </td>
                            <td className="px-6 py-4 text-gray-600 whitespace-nowrap">{item.responsible}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                <div className="flex justify-end gap-2">
                                    <button className="p-2 border border-yellow-400 text-yellow-500 rounded hover:bg-yellow-50 transition"><Eye size={12}/></button>
                                    <button className="p-2 border border-[#258C78] text-[#258C78] rounded hover:bg-teal-50 transition"><Edit size={12}/></button>
                                    <button className="p-2 border border-red-500 text-red-500 rounded hover:bg-red-50 transition"><Trash2 size={12}/></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-100 flex justify-between items-center bg-gray-50/50">
            <p className="text-sm text-gray-500">Showing 1 to 3 of 50 entries</p>
            <div className="flex border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                 <button className="px-3 py-1 border-r text-gray-500">«</button>
                 <button className="px-4 py-1 bg-[#258C78] text-white">1</button>
                 <button className="px-3 py-1 text-gray-500">»</button>
            </div>
        </div>
      </div>

      {/* --- CREATE MEASUREMENT MODAL (Updated) --- */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-5xl shadow-2xl animate-fade-in-up flex flex-col max-h-[90vh]">
                
                {/* Modal Header */}
                <div className="flex justify-between items-center p-5 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-gray-800">Measurement Create</h2>
                    <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><X size={24}/></button>
                </div>

                {/* Modal Body */}
                <div className="p-8 overflow-y-auto custom-scrollbar space-y-8">
                    
                    {/* TOP SECTION: META DATA */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        
                        {/* 1. Measurement Number */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Measurement Number</label>
                            <div className="flex">
                                <span className="bg-gray-100 border border-r-0 border-gray-300 text-gray-500 px-3 py-2 rounded-l text-sm">#MSR-000</span>
                                <input type="number" defaultValue="63" className="w-full border border-gray-300 rounded-r px-3 py-2 text-sm outline-none focus:border-[#258C78]"/>
                            </div>
                        </div>

                        {/* 2. Date */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <input type="date" defaultValue="2026-01-26" className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#258C78]"/>
                            </div>
                        </div>

                        {/* 3. Customer Select (Dropdown) */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Customer <span className="text-red-500">*</span></label>
                            <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#258C78]">
                                <option value="">Select Customer</option>
                                {customerList.map((cust) => (
                                    <option key={cust.id} value={cust.id}>{cust.name} ({cust.phone})</option>
                                ))}
                            </select>
                        </div>

                        {/* 4. Cloth Type (Auto-Fill Trigger) */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Cloth Type <span className="text-red-500">*</span></label>
                            <select 
                                value={selectedCloth}
                                onChange={handleClothChange}
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#258C78]"
                            >
                                <option value="">Select Cloth Type</option>
                                <option value="Shalwar Kameez">Shalwar Kameez</option>
                                <option value="Pant Shirt">Pant Shirt</option>
                                <option value="Waistcoat">Waistcoat</option>
                            </select>
                        </div>

                        {/* 5. Responsible User */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Responsible User</label>
                            <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#258C78]">
                                <option>Select User</option>
                                <option>Ustad Aslam (Master)</option>
                                <option>Hafiz Ali</option>
                            </select>
                        </div>
                    </div>

                    {/* BOTTOM SECTION: DYNAMIC MEASUREMENT TYPE */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                             <h3 className="font-bold text-gray-700">Measurement Type</h3>
                             <button onClick={addRow} className="bg-[#258C78] text-white px-3 py-1 rounded text-sm font-bold shadow hover:bg-teal-700 flex items-center gap-1">
                                <Plus size={16}/>
                             </button>
                        </div>
                        
                        <div className="border rounded-lg overflow-hidden">
                             <table className="w-full text-left">
                                <thead className="bg-gray-50 text-xs uppercase font-bold text-gray-500">
                                    <tr>
                                        <th className="px-4 py-3 w-1/3">Type (Body Part)</th>
                                        <th className="px-4 py-3 w-1/3">Measurement</th>
                                        <th className="px-4 py-3 w-1/6">Unit</th>
                                        <th className="px-4 py-3 w-1/6 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {measureDetails.length > 0 ? (
                                        measureDetails.map((item, index) => (
                                            <tr key={index}>
                                                <td className="px-4 py-2">
                                                    <input 
                                                        type="text" 
                                                        defaultValue={item.part} 
                                                        placeholder="e.g. Length"
                                                        className="w-full border border-gray-200 rounded px-3 py-1.5 text-sm outline-none focus:border-[#258C78]"
                                                    />
                                                </td>
                                                <td className="px-4 py-2">
                                                    <input 
                                                        type="text" 
                                                        placeholder="0.00" 
                                                        className="w-full border border-gray-200 rounded px-3 py-1.5 text-sm outline-none focus:border-[#258C78]"
                                                    />
                                                </td>
                                                <td className="px-4 py-2">
                                                    <select className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm outline-none bg-gray-50">
                                                        <option>Inch</option>
                                                        <option>CM</option>
                                                    </select>
                                                </td>
                                                <td className="px-4 py-2 text-right">
                                                    <button onClick={() => removeRow(index)} className="text-red-500 hover:bg-red-50 p-2 rounded transition"><Trash size={16}/></button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="text-center py-8 text-gray-400 text-sm">
                                                Select a Cloth Type above to load template...
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>

                {/* Footer */}
                <div className="p-5 border-t border-gray-100 flex justify-end gap-3 bg-gray-50 rounded-b-lg">
                    <button onClick={() => setShowModal(false)} className="px-6 py-2 rounded border border-gray-300 text-gray-700 font-medium hover:bg-gray-100">Cancel</button>
                    <button className="bg-[#258C78] text-white px-6 py-2 rounded font-bold shadow-sm hover:bg-teal-700 flex items-center gap-2">Create</button>
                </div>

            </div>
        </div>
      )}

    </div>
  );
};

// Helper Button Component
const ToolButton = ({ icon: Icon, label, rounded }) => (
    <button className={`flex items-center gap-1 bg-[#258C78] text-white px-3 py-1.5 text-sm font-medium border-r border-teal-600 hover:bg-teal-700 transition ${rounded === 'l' ? 'rounded-l' : ''}`}>
        {label}
    </button>
);

export default Measurements;