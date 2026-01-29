import React from 'react';
// ✅ FIX 2: 'useSearchParams' import karein
import { useSearchParams } from 'react-router-dom';
import { 
  Search, RefreshCw, FileText, Filter, Eye, Edit, Trash2 
} from 'lucide-react';

const Reports = () => {
  // ✅ FIX 3: URL se tab read karein
  const [searchParams] = useSearchParams();
  const currentView = searchParams.get('tab') || 'order'; // Agar URL me kuch na ho to default 'order'

  // --- DUMMY DATA ---
  const orderData = [
    { id: '#ODR-0033', customer: 'Jack smith', date: 'Jan 21, 2026', deadline: 'Jan 28, 2026', type: 'Shirt', status: 'Pending', inv: '-' },
    { id: '#ODR-0032', customer: 'John Smith', date: 'Jan 18, 2026', deadline: 'Jan 22, 2026', type: 'Suit', status: 'Delivered', inv: '#INV-0032' },
  ];
  const incomeData = [
    { id: '#INV-002', customer: 'Jack smith', date: 'Aug 23, 2025', due: 'Aug 30, 2025', amount: 420, status: 'Paid' },
  ];
  const expenseData = [
    { id: '#EXP-001', title: 'Cotton Rolls', category: 'Materials', date: 'Aug 24, 2025', amount: 350 },
  ];
  const profitLossData = [
    { month: 'January', income: 50000, expense: 12000, profit: 38000 },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      
      {/* 1. ORDER REPORT VIEW */}
      {currentView === 'order' && (
        <div className="space-y-6 animate-fade-in">
           <h2 className="text-xl font-bold text-gray-800">Order Report</h2>
           {/* Filters */}
           <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-wrap gap-4 items-end">
               <FilterSelect label="Responsible" />
               <FilterSelect label="Customer" />
               <FilterInput label="Date Range" type="date" />
               <button className="bg-[#258C78] text-white p-2.5 rounded-lg"><Search size={20}/></button>
           </div>
           <Toolbar />
           <TableContainer>
              <thead className="bg-gray-50 text-xs uppercase font-bold text-gray-700">
                <tr><th className="px-6 py-4">ID</th><th className="px-6 py-4">Customer</th><th className="px-6 py-4">Date</th><th className="px-6 py-4">Status</th><th className="px-6 py-4">Action</th></tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {orderData.map((item, idx) => (
                    <tr key={idx}><td className="px-6 py-4">{item.id}</td><td className="px-6 py-4">{item.customer}</td><td className="px-6 py-4">{item.date}</td>
                    <td className="px-6 py-4"><span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-bold">{item.status}</span></td>
                    <td className="px-6 py-4"><ActionButtons/></td></tr>
                ))}
              </tbody>
           </TableContainer>
        </div>
      )}

      {/* 2. INCOME REPORT VIEW */}
      {currentView === 'income' && (
        <div className="space-y-6 animate-fade-in">
           <h2 className="text-xl font-bold text-gray-800">Income Report</h2>
           <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4 items-end">
               <FilterSelect label="Customer" />
               <FilterInput label="Date Range" type="date" />
               <button className="bg-[#258C78] text-white p-2.5 rounded-lg"><Search size={20}/></button>
           </div>
           <Toolbar />
           <TableContainer>
              <thead className="bg-gray-50 text-xs uppercase font-bold text-gray-700">
                <tr><th className="px-6 py-4">ID</th><th className="px-6 py-4">Customer</th><th className="px-6 py-4">Amount</th><th className="px-6 py-4">Status</th></tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {incomeData.map((item, idx) => (
                    <tr key={idx}><td className="px-6 py-4">{item.id}</td><td className="px-6 py-4">{item.customer}</td><td className="px-6 py-4 font-bold">Rs.{item.amount}</td>
                    <td className="px-6 py-4"><span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">{item.status}</span></td></tr>
                ))}
              </tbody>
           </TableContainer>
        </div>
      )}

      {/* 3. EXPENSE REPORT VIEW */}
      {currentView === 'expense' && (
        <div className="space-y-6 animate-fade-in">
           <h2 className="text-xl font-bold text-gray-800">Expense Report</h2>
           <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4 items-end">
               <FilterSelect label="Category" />
               <FilterInput label="Date Range" type="date" />
               <button className="bg-[#258C78] text-white p-2.5 rounded-lg"><Search size={20}/></button>
           </div>
           <Toolbar />
           <TableContainer>
              <thead className="bg-gray-50 text-xs uppercase font-bold text-gray-700">
                <tr><th className="px-6 py-4">ID</th><th className="px-6 py-4">Title</th><th className="px-6 py-4">Category</th><th className="px-6 py-4">Amount</th></tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {expenseData.map((item, idx) => (
                    <tr key={idx}><td className="px-6 py-4">{item.id}</td><td className="px-6 py-4">{item.title}</td><td className="px-6 py-4">{item.category}</td><td className="px-6 py-4 font-bold text-red-500">Rs.{item.amount}</td></tr>
                ))}
              </tbody>
           </TableContainer>
        </div>
      )}

      {/* 4. PROFIT LOSS VIEW */}
      {currentView === 'profit_loss' && (
        <div className="space-y-6 animate-fade-in">
           <h2 className="text-xl font-bold text-gray-800">Profit & Loss Report</h2>
           <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4 items-end">
               <FilterSelect label="Year" placeholder="2026" />
               <button className="bg-[#258C78] text-white p-2.5 rounded-lg"><Search size={20}/></button>
           </div>
           <TableContainer>
              <thead className="bg-gray-50 text-xs uppercase font-bold text-gray-700">
                <tr><th className="px-6 py-4">Month</th><th className="px-6 py-4">Income</th><th className="px-6 py-4">Expense</th><th className="px-6 py-4">Profit</th></tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {profitLossData.map((item, idx) => (
                    <tr key={idx}><td className="px-6 py-4">{item.month}</td><td className="px-6 py-4 text-green-600">Rs.{item.income}</td><td className="px-6 py-4 text-red-500">Rs.{item.expense}</td><td className="px-6 py-4 font-bold text-[#258C78]">Rs.{item.profit}</td></tr>
                ))}
              </tbody>
           </TableContainer>
        </div>
      )}

    </div>
  );
};

// Helper Components
const FilterSelect = ({ label, placeholder = "Select" }) => (
    <div className="w-full md:w-48">
        <label className="block text-xs font-bold text-gray-600 mb-1">{label}</label>
        <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none"><option>{placeholder}</option></select>
    </div>
);
const FilterInput = ({ label, type }) => (
    <div className="w-full md:w-48">
        <label className="block text-xs font-bold text-gray-600 mb-1">{label}</label>
        <input type={type} className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none" />
    </div>
);
const Toolbar = () => (
    <div className="flex gap-0.5 mb-4"><button className="bg-[#258C78] text-white px-3 py-1.5 text-sm rounded-l">Excel</button><button className="bg-[#258C78] text-white px-3 py-1.5 text-sm">PDF</button><button className="bg-[#258C78] text-white px-3 py-1.5 text-sm rounded-r">Print</button></div>
);
const TableContainer = ({ children }) => (<div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto"><table className="w-full text-left border-collapse">{children}</table></div>);
const ActionButtons = () => (<div className="flex gap-2"><button className="text-yellow-500"><Eye size={16}/></button><button className="text-[#258C78]"><Edit size={16}/></button><button className="text-red-500"><Trash2 size={16}/></button></div>);

export default Reports;