import React from 'react';
import { Search, MessageCircle, DollarSign } from 'lucide-react';

const ConfigWhatsApp = () => {
  // Customers with pending dues
  const dueCustomers = [
    { id: 1, name: 'John Smith', phone: '923001234567', pending: 2000, lastDate: 'Jan 20, 2026' },
    { id: 2, name: 'Ali Khan', phone: '923219876543', pending: 500, lastDate: 'Jan 18, 2026' },
  ];

  const sendReminder = (customer) => {
    const message = `Salam ${customer.name}, Balouch Tailors se yaad dehani karayi ja rahi hai ke aap ki taraf Rs. ${customer.pending} baqaya hain. Baraye meherbani adaigi karein. Shukriya.`;
    // WhatsApp URL Format
    const url = `https://wa.me/${customer.phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
       <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
            <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <MessageCircle className="text-green-500"/> WhatsApp Payment Reminders
            </h1>
            <p className="text-sm text-gray-500">Send automated reminders to customers with pending balances.</p>
       </div>

       <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-green-50 text-xs uppercase font-bold text-gray-700">
                <tr>
                    <th className="px-6 py-4">Customer Name</th>
                    <th className="px-6 py-4">Phone Number</th>
                    <th className="px-6 py-4">Pending Since</th>
                    <th className="px-6 py-4 text-red-600">Pending Amount</th>
                    <th className="px-6 py-4 text-right">Action</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
                {dueCustomers.map((cust) => (
                    <tr key={cust.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-bold text-gray-800">{cust.name}</td>
                        <td className="px-6 py-4 font-mono text-gray-600">{cust.phone}</td>
                        <td className="px-6 py-4">{cust.lastDate}</td>
                        <td className="px-6 py-4 font-bold text-red-500">Rs. {cust.pending}</td>
                        <td className="px-6 py-4 text-right">
                            <button 
                                onClick={() => sendReminder(cust)}
                                className="bg-green-500 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-green-600 flex items-center gap-2 ml-auto"
                            >
                                <MessageCircle size={16}/> Send Reminder
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
          </table>
       </div>
    </div>
  );
};

export default ConfigWhatsApp;