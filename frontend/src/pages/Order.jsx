import React, { useState } from 'react';
import { 
  Plus, Search, Edit, Trash2, Eye,
  FileText, Copy, Columns, FileSpreadsheet,
  X, Save, Mic, StopCircle, Calendar, Clock
} from 'lucide-react';

const Orders = () => {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'today_created', 'today_delivery'
  const [isRecording, setIsRecording] = useState(false); // Voice note state
  const [searchTerm, setSearchTerm] = useState('');

  // 1. DUMMY ORDERS DATA (Matching Screenshot)
  const allOrders = [
    { id: '#ODR-00033', customer: 'Jack smith', orderDate: '2026-01-26', deadline: '2026-01-28', type: 'Shirt', status: 'Pending', invoice: '-' },
    { id: '#ODR-00032', customer: 'John Smith', orderDate: '2026-01-18', deadline: '2026-01-22', type: 'Suit', status: 'Delivered', invoice: '#INV-00032' },
    { id: '#ODR-00031', customer: 'Jack smith', orderDate: '2026-01-26', deadline: '2026-01-26', type: 'Suit', status: 'Delivered', invoice: '#INV-00031' },
    { id: '#ODR-00030', customer: 'Ali Khan', orderDate: '2025-12-29', deadline: '2026-01-01', type: 'Waistcoat', status: 'Processing', invoice: '#INV-00030' },
  ];
  // Logic to filter orders based on Tabs
  const getFilteredOrders = () => {
    const today = '2026-01-26'; // Assume today is 26th Jan for demo
    if (activeTab === 'today_created') return allOrders.filter(o => o.orderDate === today);
    if (activeTab === 'today_delivery') return allOrders.filter(o => o.deadline === today);
    return allOrders;
  };
  const filteredOrders = getFilteredOrders();

  // --- FORM LOGIC ---
  const [selectedCloth, setSelectedCloth] = useState('');
  const [measureDetails, setMeasureDetails] = useState([]);

  // Auto-Fill Measurements
  const handleClothChange = (e) => {
    const type = e.target.value;
    setSelectedCloth(type);
    if(type === 'Suit') setMeasureDetails([{part: 'Length', value: ''}, {part: 'Chest', value: ''}, {part: 'Tera', value: ''}]);
    else if(type === 'Shirt') setMeasureDetails([{part: 'Length', value: ''}, {part: 'Collar', value: ''}, {part: 'Sleeve', value: ''}]);
    else setMeasureDetails([]);
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      
      {/* 1. HEADER & TABS */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Tabs */}
        <div className="flex bg-gray-100 p-1 rounded-lg">
            <TabButton label="All Orders" active={activeTab === 'all'} onClick={() => setActiveTab('all')} />
            <TabButton label="Today's Orders" active={activeTab === 'today_created'} onClick={() => setActiveTab('today_created')} />
            <TabButton label="Today Delivery" active={activeTab === 'today_delivery'} onClick={() => setActiveTab('today_delivery')} />
        </div>

        <button 
            onClick={() => setShowModal(true)}
            className="bg-[#258C78] text-white px-5 py-2.5 rounded-lg font-bold shadow-lg shadow-teal-500/20 hover:bg-teal-700 transition flex items-center gap-2"
        >
            <Plus size={18}/> Create Order
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
      </div>

     {/* 3. TABLE LIST (Fixed Widths & No Splitting) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead className="bg-white border-b border-gray-200 text-gray-700 text-xs uppercase font-bold tracking-wider">
                    <tr>
                        <th className="px-6 py-4  whitespace-nowrap w-24">ID</th>
                        <th className="px-6 py-4 whitespace-nowrap min-w-[180px]">Customer</th>
                        <th className="px-6 py-4 whitespace-nowrap min-w-[120px]">Order Date</th>
                        <th className="px-6 py-4 whitespace-nowrap min-w-[120px]">Deadline</th>
                        <th className="px-6 py-4 whitespace-nowrap min-w-[140px]">Cloth Type</th>
                        <th className="px-6 py-4 whitespace-nowrap text-center min-w-[120px]">Status</th>
                        <th className="px-6 py-4 whitespace-nowrap text-center min-w-[100px]">Invoice</th>
                        <th className="px-6 py-4 whitespace-nowrap text-right min-w-[140px]">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                    {filteredOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50 transition">
                            
                            {/* ID */}
                            <td className="px-6 py-4  text-[#258C78] whitespace-nowrap">
                                {order.id}
                            </td>

                            {/* Customer */}
                            <td className="px-6 py-4 font-semibold text-gray-800 whitespace-nowrap">
                                {order.customer}
                            </td>

                            {/* Dates */}
                            <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                                {order.orderDate}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`flex items-center gap-1 ${order.deadline === '2026-01-26' ? 'text-red-500 font-bold' : 'text-gray-600'}`}>
                                    {order.deadline} 
                                    {order.deadline === '2026-01-26' && <Clock size={14} className="animate-pulse"/>}
                                </span>
                            </td>

                            {/* Cloth Type */}
                            <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                                <span className="px-2 py-1 bg-gray-100 border border-gray-200 rounded text-xs">
                                    {order.type}
                                </span>
                            </td>
                            
                            {/* Status Badge */}
                            <td className="px-6 py-4 text-center whitespace-nowrap">
                                <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                                    order.status === 'Pending' ? 'bg-yellow-50 text-yellow-600 border-yellow-200' :
                                    order.status === 'Delivered' ? 'bg-green-50 text-green-600 border-green-200' :
                                    order.status === 'Processing' ? 'bg-blue-50 text-blue-600 border-blue-200' :
                                    'bg-gray-50 text-gray-600 border-gray-200'
                                }`}>
                                    {order.status}
                                </span>
                            </td>

                            {/* Invoice */}
                            <td className="px-6 py-4 text-center text-gray-500 whitespace-nowrap font-mono text-xs">
                                {order.invoice}
                            </td>

                            {/* Actions */}
                            <td className="px-6 py-4 text-right whitespace-nowrap">
                                <div className="flex justify-end gap-2">
                                    <button className="p-2 border border-yellow-400 text-yellow-500 rounded hover:bg-yellow-50 transition" title="View Details"><Eye size={16}/></button>
                                    <button className="p-2 border border-[#258C78] text-[#258C78] rounded hover:bg-teal-50 transition" title="Edit Order"><Edit size={16}/></button>
                                    <button className="p-2 border border-red-500 text-red-500 rounded hover:bg-red-50 transition" title="Delete"><Trash2 size={16}/></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-100 flex justify-between items-center bg-gray-50/50">
             <p className="text-sm text-gray-500">Showing <span className="font-bold text-gray-800">{filteredOrders.length}</span> orders</p>
             <div className="flex border border-gray-200 rounded bg-white shadow-sm overflow-hidden">
                 <button className="px-3 py-1 hover:bg-gray-50 border-r border-gray-200 text-gray-500">«</button>
                 <button className="px-4 py-1 bg-[#258C78] text-white font-medium border-r border-teal-600">1</button>
                 <button className="px-3 py-1 hover:bg-gray-50 text-gray-500">»</button>
             </div>
        </div>
      </div>

      {/* --- CREATE ORDER MODAL --- */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-5xl shadow-2xl animate-fade-in-up flex flex-col max-h-[95vh]">
                
                {/* Header */}
                <div className="flex justify-between items-center p-5 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-gray-800">Create New Order</h2>
                    <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><X size={24}/></button>
                </div>

                {/* Form Body */}
                <div className="p-8 overflow-y-auto custom-scrollbar space-y-6">
                    
                    {/* Row 1 */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <InputGroup label="Order Number" value="#ODR-00034" readOnly bg="bg-gray-50" />
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Customer <span className="text-red-500">*</span></label>
                            <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#258C78]">
                                <option>Select Customer</option>
                                <option>Jack Smith</option>
                                <option>Ali Khan</option>
                            </select>
                        </div>
                        <InputGroup label="Order Date" type="date" value="2026-01-26" />
                    </div>

                    {/* Row 2 */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <InputGroup label="Deadline Date" type="date" required />
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Cloth Type <span className="text-red-500">*</span></label>
                            <select onChange={handleClothChange} className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#258C78]">
                                <option value="">Select Cloth Type</option>
                                <option value="Suit">Suit (Shalwar Kameez)</option>
                                <option value="Shirt">Shirt</option>
                            </select>
                        </div>
                        <InputGroup label="Quantity" placeholder="e.g. 1" type="number" />
                    </div>

                    {/* Row 3 */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <InputGroup label="Fabric" placeholder="e.g. Wash & Wear" />
                        <InputGroup label="Fabric Color" placeholder="e.g. Black" />
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#258C78]">
                                <option>Pending</option>
                                <option>Processing</option>
                                <option>Completed</option>
                                <option>Delivered</option>
                            </select>
                        </div>
                    </div>

                    {/* Row 4: Attachments */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Fabric Sample (Image)</label>
                            <div className="flex items-center"><label className="cursor-pointer bg-gray-100 border border-gray-300 text-gray-700 px-3 py-2 rounded-l text-sm hover:bg-gray-200">Choose File<input type="file" className="hidden"/></label><span className="border border-l-0 border-gray-300 px-3 py-2 rounded-r text-sm text-gray-500 bg-white flex-1">No file chosen</span></div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Sewing Pattern (Design)</label>
                            <div className="flex items-center"><label className="cursor-pointer bg-gray-100 border border-gray-300 text-gray-700 px-3 py-2 rounded-l text-sm hover:bg-gray-200">Choose File<input type="file" className="hidden"/></label><span className="border border-l-0 border-gray-300 px-3 py-2 rounded-r text-sm text-gray-500 bg-white flex-1">No file chosen</span></div>
                        </div>
                    </div>

                    {/* Voice Note & Notes */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Special Instructions / Voice Note</label>
                        <div className="relative">
                            <textarea rows="3" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#258C78] pr-12" placeholder="Enter notes or record audio..."></textarea>
                            
                            {/* Voice Button */}
                            <button 
                                onClick={() => setIsRecording(!isRecording)}
                                className={`absolute right-3 bottom-3 p-2 rounded-full transition-all shadow-sm ${isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-100 text-gray-600 hover:bg-[#258C78] hover:text-white'}`}
                                title="Record Voice Note"
                            >
                                {isRecording ? <StopCircle size={20}/> : <Mic size={20}/>}
                            </button>
                        </div>
                        {isRecording && <p className="text-xs text-red-500 font-bold animate-pulse">Recording... 00:05</p>}
                    </div>

                    {/* Auto-Loaded Measurements */}
                    {measureDetails.length > 0 && (
                        <div>
                            <h3 className="font-bold text-gray-700 mb-2 border-b pb-1">Measurement Details (Auto-Loaded)</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {measureDetails.map((item, idx) => (
                                    <div key={idx}>
                                        <label className="text-xs text-gray-500 uppercase font-bold">{item.part}</label>
                                        <input type="text" className="w-full border border-gray-200 rounded px-2 py-1 text-sm bg-gray-50" placeholder="0.00"/>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>

                {/* Footer */}
                <div className="p-5 border-t border-gray-100 flex justify-end gap-3 bg-gray-50 rounded-b-lg">
                    <button onClick={() => setShowModal(false)} className="px-6 py-2 rounded border border-gray-300 text-gray-700 font-medium hover:bg-gray-100">Cancel</button>
                    <button className="bg-[#258C78] text-white px-6 py-2 rounded font-bold shadow-sm hover:bg-teal-700 flex items-center gap-2"><Save size={18}/> Create Order</button>
                </div>

            </div>
        </div>
      )}

    </div>
  );
};

// --- Helper Components ---
const TabButton = ({ label, active, onClick }) => (
    <button 
        onClick={onClick}
        className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${active ? 'bg-white text-[#258C78] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
    >
        {label}
    </button>
);

const ToolButton = ({ icon: Icon, label, rounded }) => (
    <button className={`flex items-center gap-1 bg-[#258C78] text-white px-3 py-1.5 text-sm font-medium border-r border-teal-600 hover:bg-teal-700 transition ${rounded === 'l' ? 'rounded-l' : ''}`}>
        {label}
    </button>
);

const InputGroup = ({ label, placeholder, required, type = "text", value, readOnly, bg }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label} {required && <span className="text-red-500">*</span>}</label>
        <input 
            type={type} 
            placeholder={placeholder} 
            value={value}
            readOnly={readOnly}
            className={`w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#258C78] ${bg || 'bg-white'}`}
        />
    </div>
);

export default Orders;