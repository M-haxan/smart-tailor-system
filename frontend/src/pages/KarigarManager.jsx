import React, { useState } from 'react';
import { 
  Users, Scissors, CheckCircle, Clock, 
  Search, Filter, DollarSign, Save, ChevronRight,
  PlusCircle, X, Calendar
} from 'lucide-react';

const KarigarManager = () => {
  const [activeTab, setActiveTab] = useState('assign'); // 'assign' or 'hisab'
  const [showAdvanceModal, setShowAdvanceModal] = useState(false); // ✅ Modal State

  // --- DUMMY DATA ---
  
  // 1. Pending Orders
  const [pendingOrders, setPendingOrders] = useState([
    { id: '#ODR-33', customer: 'Jack Smith', type: 'Suit', deadline: 'Jan 28', status: 'Pending' },
    { id: '#ODR-34', customer: 'Ali Khan', type: 'Kurta', deadline: 'Jan 30', status: 'Pending' },
    { id: '#ODR-35', customer: 'Usman Butt', type: 'Waistcoat', deadline: 'Feb 02', status: 'Pending' },
  ]);

  // 2. Karigar List
  const karigars = [
    { id: 1, name: 'Ustad Aslam', role: 'Master', activeSuits: 2 },
    { id: 2, name: 'Hafiz Ali', role: 'Karigar', activeSuits: 0 },
    { id: 3, name: 'Rashid Minhas', role: 'Karigar', activeSuits: 5 },
  ];

  // 3. Hisab Data (Weekly Ledger)
  // 'paid' column ab Advance + Payments ko show karega
  const hisabData = [
    { id: 1, name: 'Ustad Aslam', completed: 12, rate: 600, total: 7200, paid: 2000, balance: 5200 },
    { id: 2, name: 'Hafiz Ali', completed: 8, rate: 500, total: 4000, paid: 4000, balance: 0 },
    { id: 3, name: 'Rashid Minhas', completed: 15, rate: 600, total: 9000, paid: 0, balance: 9000 },
  ];

  // --- ACTIONS ---
  const handleAssign = (orderId, karigarName) => {
    alert(`Order ${orderId} assigned to ${karigarName}`);
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      
      {/* HEADER */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
            <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Scissors className="text-[#258C78]"/> Karigar Management
            </h1>
            <p className="text-sm text-gray-500">Assign suits & manage weekly wages (hisaab).</p>
        </div>
        
        {/* Tabs Toggle */}
        <div className="flex bg-gray-100 p-1 rounded-lg">
            <button 
                onClick={() => setActiveTab('assign')}
                className={`px-4 py-2 text-sm font-bold rounded-md transition-all ${activeTab === 'assign' ? 'bg-white text-[#258C78] shadow-sm' : 'text-gray-500'}`}
            >
                Assign Work
            </button>
            <button 
                onClick={() => setActiveTab('hisab')}
                className={`px-4 py-2 text-sm font-bold rounded-md transition-all ${activeTab === 'hisab' ? 'bg-white text-[#258C78] shadow-sm' : 'text-gray-500'}`}
            >
                Weekly Hisab
            </button>
        </div>
      </div>

      {/* --- TAB 1: ASSIGN WORK --- */}
      {activeTab === 'assign' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left: Pending Orders */}
            <div className="lg:col-span-2 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <h2 className="font-bold text-gray-800 mb-4">Pending Orders (Unassigned)</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                            <tr>
                                <th className="px-4 py-3">Order #</th>
                                <th className="px-4 py-3">Customer</th>
                                <th className="px-4 py-3">Type</th>
                                <th className="px-4 py-3 text-red-500">Deadline</th>
                                <th className="px-4 py-3">Assign To</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {pendingOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 font-bold text-[#258C78]">{order.id}</td>
                                    <td className="px-4 py-3">{order.customer}</td>
                                    <td className="px-4 py-3"><span className="bg-gray-100 px-2 py-1 rounded text-xs border">{order.type}</span></td>
                                    <td className="px-4 py-3 text-red-500 font-medium">{order.deadline}</td>
                                    <td className="px-4 py-3">
                                        <select 
                                            className="border border-gray-300 rounded px-2 py-1.5 text-xs outline-none focus:border-[#258C78] w-32 cursor-pointer"
                                            onChange={(e) => handleAssign(order.id, e.target.value)}
                                        >
                                            <option value="">Select...</option>
                                            {karigars.map(k => <option key={k.id} value={k.name}>{k.name}</option>)}
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Right: Active Load */}
            <div className="space-y-4">
                <div className="bg-[#258C78] text-white p-5 rounded-xl shadow-lg">
                    <h3 className="font-bold text-lg mb-1">Active Work Load</h3>
                    <p className="text-teal-100 text-sm">Real-time status of workers</p>
                </div>
                {karigars.map((k) => (
                    <div key={k.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-600">
                                {k.name.charAt(0)}
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-800 text-sm">{k.name}</h4>
                                <p className="text-xs text-gray-500">{k.role}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className={`text-xl font-bold ${k.activeSuits > 3 ? 'text-red-500' : 'text-green-500'}`}>
                                {k.activeSuits}
                            </span>
                            <p className="text-[10px] text-gray-400 uppercase">Suits in Hand</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      )}

      {/* --- TAB 2: WEEKLY HISAB --- */}
      {activeTab === 'hisab' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-fade-in">
            
            {/* Toolbar */}
            <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50/50">
                <div className="flex gap-2 items-center w-full sm:w-auto">
                    <span className="text-sm font-bold text-gray-600">Week:</span>
                    <select className="border border-gray-300 rounded px-3 py-1.5 text-sm outline-none bg-white flex-1 sm:flex-none">
                        <option>Current Week (Jan 22 - Jan 29)</option>
                        <option>Last Week (Jan 15 - Jan 21)</option>
                    </select>
                </div>
                
                <div className="flex gap-2 w-full sm:w-auto">
                    {/* ✅ GIVE ADVANCE BUTTON */}
                    <button 
                        onClick={() => setShowAdvanceModal(true)}
                        className="flex-1 sm:flex-none bg-white border border-[#258C78] text-[#258C78] px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-teal-50 flex items-center justify-center gap-2 transition-all"
                    >
                        <PlusCircle size={16}/> Give Advance
                    </button>
                    
                    <button className="flex-1 sm:flex-none bg-[#258C78] text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-teal-700 flex items-center justify-center gap-2 transition-all">
                        <Save size={16}/> Save & Close Week
                    </button>
                </div>
            </div>

            {/* Hisab Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-white border-b border-gray-200 text-gray-700 text-xs uppercase font-bold">
                        <tr>
                            <th className="px-6 py-4">Karigar Name</th>
                            <th className="px-6 py-4 text-center">Completed Suits</th>
                            <th className="px-6 py-4 text-right">Rate (Avg)</th>
                            <th className="px-6 py-4 text-right text-blue-600">Total Earnings</th>
                            <th className="px-6 py-4 text-right text-green-600">Paid / Advance</th>
                            <th className="px-6 py-4 text-right text-red-500">Balance Due</th>
                            <th className="px-6 py-4 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm">
                        {hisabData.map((row) => (
                            <tr key={row.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 font-bold text-gray-800">{row.name}</td>
                                <td className="px-6 py-4 text-center">
                                    <span className="bg-gray-100 px-2 py-1 rounded font-bold text-gray-700">{row.completed}</span>
                                </td>
                                <td className="px-6 py-4 text-right text-gray-500">Rs. {row.rate}</td>
                                <td className="px-6 py-4 text-right font-bold text-blue-600">Rs. {row.total}</td>
                                <td className="px-6 py-4 text-right font-medium text-green-600">Rs. {row.paid}</td>
                                <td className="px-6 py-4 text-right font-extrabold text-red-500">
                                    {row.balance > 0 ? `Rs. ${row.balance}` : <span className="text-green-500 flex items-center justify-end gap-1"><CheckCircle size={14}/> Cleared</span>}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    {row.balance > 0 && (
                                        <button className="bg-teal-50 text-[#258C78] border border-[#258C78] px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-[#258C78] hover:text-white transition-all">
                                            Pay Now
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot className="bg-gray-50 border-t border-gray-200">
                        <tr>
                            <td className="px-6 py-4 font-bold text-gray-800">Total</td>
                            <td className="px-6 py-4 text-center font-bold">35</td>
                            <td></td>
                            <td className="px-6 py-4 text-right font-bold text-blue-700">Rs. 20,200</td>
                            <td className="px-6 py-4 text-right font-bold text-green-700">Rs. 6,000</td>
                            <td className="px-6 py-4 text-right font-bold text-red-600">Rs. 14,200</td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
      )}

      {/* --- ADVANCE MODAL (POPUP) --- */}
      {showAdvanceModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-md shadow-2xl animate-fade-in-up">
                
                {/* Header */}
                <div className="flex justify-between items-center p-5 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-gray-800">Give Advance (Bayana)</h2>
                    <button onClick={() => setShowAdvanceModal(false)} className="text-gray-400 hover:text-gray-600"><X size={24}/></button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-4">
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Select Karigar</label>
                        <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#258C78]">
                            <option>Select Karigar</option>
                            {karigars.map(k => <option key={k.id}>{k.name}</option>)}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Advance Amount</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold">Rs.</span>
                            <input 
                                type="number" 
                                placeholder="0" 
                                className="w-full pl-10 border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#258C78]"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                        <input type="date" className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#258C78]" defaultValue="2026-02-18" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Note (Optional)</label>
                        <textarea rows="2" className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#258C78]" placeholder="Reason for advance..."></textarea>
                    </div>

                </div>

                {/* Footer */}
                <div className="p-5 border-t border-gray-100 flex justify-end gap-3 bg-gray-50 rounded-b-lg">
                    <button onClick={() => setShowAdvanceModal(false)} className="px-4 py-2 rounded border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 text-sm">Cancel</button>
                    <button className="bg-[#258C78] text-white px-6 py-2 rounded font-bold shadow-sm hover:bg-teal-700 text-sm flex items-center gap-2">
                        <DollarSign size={16}/> Save Record
                    </button>
                </div>

            </div>
        </div>
      )}

    </div>
  );
};

export default KarigarManager;