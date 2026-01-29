import React, { useState } from 'react';
import { 
  Search, Edit, Save, X, DollarSign, Users, Info 
} from 'lucide-react';

const ConfigKarigarRates = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedRate, setSelectedRate] = useState(null);

  // 1. DUMMY DATA: Cloth Types aur unke Karigar Rates
  const [rates, setRates] = useState([
    { id: 1, clothType: 'Men\'s Kurta', customerPrice: 1500, karigarRate: 400 },
    { id: 2, clothType: 'Shalwar Kameez', customerPrice: 2000, karigarRate: 600 },
    { id: 3, clothType: 'Waistcoat', customerPrice: 3000, karigarRate: 1200 },
    { id: 4, clothType: 'Pant Coat (2 Pc)', customerPrice: 8000, karigarRate: 3500 },
  ]);

  // Handle Edit Click
  const handleEdit = (rate) => {
    setSelectedRate(rate);
    setShowModal(true);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      
      {/* HEADER */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
        <div>
            <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <DollarSign className="text-[#258C78]"/> Karigar Stitching Rates
            </h1>
            <p className="text-sm text-gray-500">Set labor cost (majdoori) for each cloth type.</p>
        </div>
      </div>

      {/* RATES TABLE */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Info Banner */}
        <div className="bg-blue-50 p-4 border-b border-blue-100 flex gap-3 items-start">
            <Info size={20} className="text-blue-500 mt-0.5 shrink-0"/>
            <p className="text-sm text-blue-700">
                <strong>Note:</strong> Ye "Default Rates" hain. Jab bhi aap koi naya order banayenge, Karigar ke khatay mein ye raqam khud-ba-khud jama ho jayegi.
            </p>
        </div>

        <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-xs uppercase font-bold text-gray-700">
                <tr>
                    <th className="px-6 py-4">Cloth Type</th>
                    <th className="px-6 py-4">Customer Price (Est.)</th>
                    <th className="px-6 py-4 bg-teal-50 text-[#258C78]">Karigar Rate (Majdoori)</th>
                    <th className="px-6 py-4 text-right">Action</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
                {rates.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 font-bold text-gray-800">{item.clothType}</td>
                        <td className="px-6 py-4 text-gray-500">Rs. {item.customerPrice}</td>
                        
                        {/* Highlighted Karigar Rate */}
                        <td className="px-6 py-4 bg-teal-50/30">
                            <span className="font-bold text-[#258C78] text-base">Rs. {item.karigarRate}</span>
                            <span className="text-xs text-gray-400 ml-1">/ Suit</span>
                        </td>

                        <td className="px-6 py-4 text-right">
                            <button 
                                onClick={() => handleEdit(item)}
                                className="bg-white border border-gray-300 text-gray-600 px-3 py-1.5 rounded-lg text-xs font-bold hover:border-[#258C78] hover:text-[#258C78] flex items-center gap-2 ml-auto transition-all"
                            >
                                <Edit size={14}/> Update Rate
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>

      {/* EDIT MODAL */}
      {showModal && selectedRate && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-md shadow-2xl animate-fade-in-up">
                
                {/* Modal Header */}
                <div className="flex justify-between items-center p-5 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-gray-800">Update Rate</h2>
                    <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><X size={24}/></button>
                </div>

                {/* Modal Body */}
                <div className="p-6 space-y-4">
                    
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-center">
                        <p className="text-xs text-gray-500 uppercase font-bold">Cloth Type</p>
                        <p className="text-lg font-bold text-[#258C78]">{selectedRate.clothType}</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">New Karigar Rate (Rs.)</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold">Rs.</span>
                            <input 
                                type="number" 
                                defaultValue={selectedRate.karigarRate}
                                className="w-full pl-10 border border-gray-300 rounded-lg px-3 py-2 text-lg font-bold text-gray-800 outline-none focus:border-[#258C78] focus:ring-1 focus:ring-[#258C78]"
                            />
                        </div>
                        <p className="text-xs text-gray-400 mt-1">This amount will be credited to the Karigar's account per order.</p>
                    </div>

                </div>

                {/* Modal Footer */}
                <div className="p-5 border-t border-gray-100 flex justify-end gap-3 bg-gray-50 rounded-b-lg">
                    <button onClick={() => setShowModal(false)} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 text-sm">Cancel</button>
                    <button className="bg-[#258C78] text-white px-6 py-2 rounded-lg font-bold shadow-sm hover:bg-teal-700 flex items-center gap-2 text-sm">
                        <Save size={16}/> Save Changes
                    </button>
                </div>

            </div>
        </div>
      )}

    </div>
  );
};

export default ConfigKarigarRates;