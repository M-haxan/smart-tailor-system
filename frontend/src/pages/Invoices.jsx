import React, { useState, useEffect } from 'react';
import { 
  Plus, Search, Edit, Trash2, Eye,
  FileText, Copy, Columns, FileSpreadsheet,
  X, Save, Printer, Share2, Calculator
} from 'lucide-react';

const Invoices = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // 1. DUMMY DATA (Pakistani Context)
  const invoices = [
    { id: '#INV-00032', customer: 'John Smith', date: 'Jan 18, 2026', total: 2500, paid: 500, balance: 2000, status: 'Partial', method: 'Cash' },
    { id: '#INV-00031', customer: 'Jack smith', date: 'Jan 18, 2026', total: 1800, paid: 1800, balance: 0, status: 'Paid', method: 'JazzCash' },
    { id: '#INV-00030', customer: 'Ali Khan', date: 'Jan 15, 2026', total: 4000, paid: 0, balance: 4000, status: 'Unpaid', method: '-' },
    { id: '#INV-00029', customer: 'Usman Butt', date: 'Jan 12, 2026', total: 1500, paid: 500, balance: 1000, status: 'Partial', method: 'EasyPaisa' },
  ];

  // --- CALCULATOR LOGIC FOR MODAL ---
  const [formData, setFormData] = useState({
    totalAmount: '',
    discount: '',
    paidAmount: ''
  });
  
  const [calculations, setCalculations] = useState({
    finalTotal: 0,
    balance: 0
  });

  // Jab bhi numbers change hon, hisaab khud ho jaye
  useEffect(() => {
    const total = parseFloat(formData.totalAmount) || 0;
    const disc = parseFloat(formData.discount) || 0;
    const paid = parseFloat(formData.paidAmount) || 0;

    const final = total - disc;
    const bal = final - paid;

    setCalculations({
        finalTotal: final > 0 ? final : 0,
        balance: bal > 0 ? bal : 0
    });
  }, [formData]);

  const handleInputChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      
      {/* 1. HEADER */}
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-xl font-bold text-gray-800">Invoice List (Khata)</h1>
        <button 
            onClick={() => setShowModal(true)}
            className="bg-[#258C78] text-white px-4 py-2 rounded-lg font-bold shadow-sm hover:bg-teal-700 transition flex items-center gap-2"
        >
            <Plus size={18}/> Create Invoice
        </button>
      </div>

      {/* 2. TOOLBAR */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex gap-0.5">
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
                placeholder="Name or Invoice #"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
      </div>

      {/* 3. TABLE LIST */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead className="bg-white border-b border-gray-200 text-gray-700 text-xs uppercase font-bold tracking-wider">
                    <tr>
                        <th className="px-6 py-4 whitespace-nowrap w-24">ID</th>
                        <th className="px-6 py-4 whitespace-nowrap min-w-[180px]">Customer</th>
                        <th className="px-6 py-4 whitespace-nowrap">Date</th>
                        <th className="px-6 py-4 whitespace-nowrap">Total</th>
                        <th className="px-6 py-4 whitespace-nowrap text-green-600">Received (Bayana)</th>
                        <th className="px-6 py-4 whitespace-nowrap text-red-500">Balance (Baqaya)</th>
                        <th className="px-6 py-4 whitespace-nowrap text-center">Status</th>
                        <th className="px-6 py-4 whitespace-nowrap text-right">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                    {invoices.map((inv) => (
                        <tr key={inv.id} className="hover:bg-gray-50 transition">
                            <td className="px-6 py-4 font-bold text-[#258C78] whitespace-nowrap">{inv.id}</td>
                            
                            <td className="px-6 py-4 font-semibold text-gray-800 whitespace-nowrap">
                                {inv.customer}
                                <span className="block text-[10px] text-gray-400 font-normal">{inv.method}</span>
                            </td>
                            
                            <td className="px-6 py-4 text-gray-600 whitespace-nowrap">{inv.date}</td>
                            
                            <td className="px-6 py-4 font-bold text-gray-800 whitespace-nowrap">Rs. {inv.total}</td>
                            
                            <td className="px-6 py-4 text-green-600 font-medium whitespace-nowrap">
                                {inv.paid > 0 ? `Rs. ${inv.paid}` : '-'}
                            </td>
                            
                            <td className="px-6 py-4 text-red-500 font-bold whitespace-nowrap">
                                {inv.balance > 0 ? `Rs. ${inv.balance}` : <span className="text-green-500 flex items-center gap-1">✔ Clear</span>}
                            </td>
                            
                            {/* Status Badge */}
                            <td className="px-6 py-4 text-center whitespace-nowrap">
                                <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                                    inv.status === 'Paid' ? 'bg-green-50 text-green-600 border-green-200' :
                                    inv.status === 'Partial' ? 'bg-yellow-50 text-yellow-600 border-yellow-200' :
                                    'bg-red-50 text-red-600 border-red-200'
                                }`}>
                                    {inv.status}
                                </span>
                            </td>

                            <td className="px-6 py-4 text-right whitespace-nowrap">
                                <div className="flex justify-end gap-2">
                                    <button className="p-2 border border-gray-200 text-gray-500 rounded hover:bg-gray-100" title="Print Invoice"><Printer size={16}/></button>
                                    <button className="p-2 border border-[#258C78] text-[#258C78] rounded hover:bg-teal-50" title="View"><Eye size={16}/></button>
                                    <button className="p-2 border border-green-500 text-green-500 rounded hover:bg-green-50" title="WhatsApp Receipt"><Share2 size={16}/></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-100 flex justify-between items-center bg-gray-50/50">
             <p className="text-sm text-gray-500">Showing {invoices.length} invoices</p>
             <div className="flex border border-gray-200 rounded bg-white shadow-sm overflow-hidden">
                 <button className="px-3 py-1 hover:bg-gray-50 border-r border-gray-200 text-gray-500">«</button>
                 <button className="px-4 py-1 bg-[#258C78] text-white font-medium border-r border-teal-600">1</button>
                 <button className="px-3 py-1 hover:bg-gray-50 text-gray-500">»</button>
             </div>
        </div>
      </div>

      {/* --- CREATE INVOICE MODAL (Pakistani Style) --- */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-4xl shadow-2xl animate-fade-in-up flex flex-col max-h-[90vh]">
                
                {/* Header */}
                <div className="flex justify-between items-center p-5 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <Calculator size={20} className="text-[#258C78]"/> Create New Invoice
                    </h2>
                    <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><X size={24}/></button>
                </div>

                {/* Body */}
                <div className="p-8 overflow-y-auto custom-scrollbar space-y-8">
                    
                    {/* 1. SELECTION */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Select Customer <span className="text-red-500">*</span></label>
                            <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#258C78]">
                                <option>Select Customer</option>
                                <option>John Smith</option>
                                <option>Ali Khan</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Link Order (Optional)</label>
                            <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#258C78]">
                                <option>Select Order #</option>
                                <option>#ODR-00034 (Pending)</option>
                                <option>#ODR-00033 (Delivered)</option>
                            </select>
                        </div>
                    </div>

                    {/* 2. PAYMENT DETAILS (The Main Logic) */}
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 border-b pb-2">Payment Calculation</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            
                            {/* Total Bill */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Total Bill (Kul Raqam)</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold">Rs.</span>
                                    <input 
                                        type="number" 
                                        name="totalAmount"
                                        placeholder="0" 
                                        className="w-full pl-10 border border-gray-300 rounded px-3 py-2 text-lg font-bold text-gray-800 outline-none focus:border-[#258C78]"
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            {/* Discount */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Discount (Riayat)</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold">-</span>
                                    <input 
                                        type="number" 
                                        name="discount"
                                        placeholder="0" 
                                        className="w-full pl-8 border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#258C78] text-red-500"
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            {/* Final Total (Read Only) */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Net Payable</label>
                                <div className="w-full bg-white border border-gray-200 rounded px-3 py-2 text-lg font-bold text-[#258C78]">
                                    Rs. {calculations.finalTotal}
                                </div>
                            </div>
                        </div>

                        <div className="my-4 border-t border-gray-200"></div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            
                            {/* Received Amount */}
                            <div>
                                <label className="block text-sm font-bold text-green-700 mb-1">Received (Bayana/Advance)</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-green-600 font-bold">Rs.</span>
                                    <input 
                                        type="number" 
                                        name="paidAmount"
                                        placeholder="0" 
                                        className="w-full pl-10 border border-green-300 rounded px-3 py-2 text-lg font-bold text-green-700 outline-none focus:ring-2 focus:ring-green-500"
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Mode</label>
                                <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#258C78]">
                                    <option>Cash</option>
                                    <option>JazzCash</option>
                                    <option>EasyPaisa</option>
                                    <option>Bank Transfer</option>
                                </select>
                            </div>

                            {/* Remaining Balance (Read Only) */}
                            <div>
                                <label className="block text-sm font-bold text-red-500 mb-1">Remaining Balance (Baqaya)</label>
                                <div className="w-full bg-red-50 border border-red-200 rounded px-3 py-2 text-xl font-extrabold text-red-600">
                                    Rs. {calculations.balance}
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* 3. DATES */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <InputGroup label="Invoice Date" type="date" value="2026-01-26" />
                         <InputGroup label="Due Date (Wada)" type="date" />
                    </div>

                    {/* Note */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Note (Optional)</label>
                        <textarea rows="2" className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#258C78]" placeholder="e.g. Baki paisay 10 tareekh ko den gay"></textarea>
                    </div>

                </div>

                {/* Footer */}
                <div className="p-5 border-t border-gray-100 flex justify-end gap-3 bg-gray-50 rounded-b-lg">
                    <button onClick={() => setShowModal(false)} className="px-6 py-2 rounded border border-gray-300 text-gray-700 font-medium hover:bg-gray-100">Cancel</button>
                    <button className="bg-[#258C78] text-white px-6 py-2 rounded font-bold shadow-sm hover:bg-teal-700 flex items-center gap-2"><Save size={18}/> Generate Invoice</button>
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

const InputGroup = ({ label, placeholder, type = "text", value }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input 
            type={type} 
            placeholder={placeholder} 
            defaultValue={value}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#258C78]"
        />
    </div>
);

export default Invoices;