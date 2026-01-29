import React, { useState } from 'react';
import { 
  Plus, Search, Edit, Trash2, Eye, 
  FileText, Copy, Columns, FileSpreadsheet,
  X, Save, Layers
} from 'lucide-react';

const ConfigClothType = () => {
  const [showModal, setShowModal] = useState(false);
  
  // Dummy Data for List View
  const clothTypes = [
    { id: 1, title: 'Kaftan', gender: 'Male', amount: 200 },
    { id: 2, title: 'Borka', gender: 'Female', amount: 400 },
    { id: 3, title: 'Men Shirt', gender: 'Male', amount: 500 },
  ];

  // Logic for Creating Template (Dynamic Rows)
  const [measureRows, setMeasureRows] = useState([{ title: '', unit: 'in', sequence: 1 }]);

  const addRow = () => {
    setMeasureRows([...measureRows, { title: '', unit: 'in', sequence: measureRows.length + 1 }]);
  };

  const removeRow = (index) => {
    const list = [...measureRows];
    list.splice(index, 1);
    setMeasureRows(list);
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      
      {/* HEADER */}
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Layers className="text-[#258C78]"/> Cloth Type & Templates
        </h1>
        <button 
            onClick={() => setShowModal(true)}
            className="bg-[#258C78] text-white px-4 py-2 rounded-lg font-bold shadow-sm hover:bg-teal-700 transition flex items-center gap-2"
        >
            <Plus size={18}/> Create Cloth Type
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex gap-2">
             <button className="bg-[#258C78] text-white px-3 py-1.5 text-sm rounded-l">Excel</button>
             <button className="bg-[#258C78] text-white px-3 py-1.5 text-sm">PDF</button>
             <button className="bg-[#258C78] text-white px-3 py-1.5 text-sm rounded-r">Copy</button>
        </div>
        <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-xs uppercase font-bold text-gray-700">
                <tr>
                    <th className="px-6 py-4">Title</th>
                    <th className="px-6 py-4">Gender</th>
                    <th className="px-6 py-4">Stitching Amount</th>
                    <th className="px-6 py-4 text-right">Action</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
                {clothTypes.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium">{item.title}</td>
                        <td className="px-6 py-4">{item.gender}</td>
                        <td className="px-6 py-4 font-bold text-[#258C78]">Rs. {item.amount}</td>
                        <td className="px-6 py-4 text-right flex justify-end gap-2">
                            <button className="text-yellow-500 p-1 border rounded hover:bg-yellow-50"><Eye size={16}/></button>
                            <button className="text-[#258C78] p-1 border rounded hover:bg-teal-50"><Edit size={16}/></button>
                            <button className="text-red-500 p-1 border rounded hover:bg-red-50"><Trash2 size={16}/></button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>

      {/* CREATE MODAL (Matches Screenshot image_3d4783.png) */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-4xl shadow-2xl animate-fade-in-up flex flex-col max-h-[90vh]">
                
                <div className="flex justify-between items-center p-5 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-gray-800">Create Cloth Type & Template</h2>
                    <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><X size={24}/></button>
                </div>

                <div className="p-8 overflow-y-auto custom-scrollbar space-y-6">
                    
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-xs font-bold text-gray-600 mb-1">Title <span className="text-red-500">*</span></label>
                            <input type="text" placeholder="Enter cloth title (e.g. Kurta)" className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#258C78]"/>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-600 mb-1">Gender <span className="text-red-500">*</span></label>
                            <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#258C78]">
                                <option>Male</option>
                                <option>Female</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-600 mb-1">Amount (Price) <span className="text-red-500">*</span></label>
                            <input type="number" placeholder="Enter stitching price" className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#258C78]"/>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1">Note</label>
                        <textarea className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#258C78]"></textarea>
                    </div>

                    {/* DYNAMIC MEASUREMENT TEMPLATE */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-800 mb-3 border-b pb-2">Measurement Detail Template</h3>
                        {measureRows.map((row, index) => (
                            <div key={index} className="flex gap-4 items-end mb-3">
                                <div className="flex-1">
                                    <label className="block text-xs font-bold text-gray-500 mb-1">Measurement Title</label>
                                    <input type="text" placeholder="e.g. Length" className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#258C78]"/>
                                </div>
                                <div className="w-32">
                                    <label className="block text-xs font-bold text-gray-500 mb-1">Unit</label>
                                    <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none bg-white">
                                        <option>Inch</option>
                                        <option>CM</option>
                                        <option>Meter</option>
                                    </select>
                                </div>
                                <div className="w-24">
                                    <label className="block text-xs font-bold text-gray-500 mb-1">Order</label>
                                    <input type="number" defaultValue={row.sequence} className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none"/>
                                </div>
                                <button onClick={() => removeRow(index)} className="p-2 text-red-500 hover:bg-red-50 rounded border border-red-200"><Trash2 size={18}/></button>
                            </div>
                        ))}
                        <button onClick={addRow} className="mt-2 bg-[#258C78] text-white px-4 py-2 rounded text-sm font-bold shadow-sm hover:bg-teal-700 flex items-center gap-2">
                            <Plus size={16}/> Add Measurement Field
                        </button>
                    </div>

                </div>

                <div className="p-5 border-t border-gray-100 flex justify-end gap-3 bg-gray-50 rounded-b-lg">
                    <button onClick={() => setShowModal(false)} className="px-6 py-2 rounded border border-gray-300 text-gray-700 font-medium hover:bg-gray-100">Cancel</button>
                    <button className="bg-[#258C78] text-white px-6 py-2 rounded font-bold shadow-sm hover:bg-teal-700">Create</button>
                </div>

            </div>
        </div>
      )}

    </div>
  );
};

export default ConfigClothType;