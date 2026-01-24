import React from 'react';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
        {/* Welcome Section */}
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-gray-500 mt-1">Welcome back, <span className="font-bold text-[#258C78]">{user && user.name}</span>! 👋</p>
        </div>

        {/* Stats Cards (Abhi Dummy Hain) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Total Customers" value="120" color="bg-blue-500" />
            <StatCard title="Active Orders" value="8" color="bg-amber-500" />
            <StatCard title="Pending Payments" value="Rs. 45,000" color="bg-red-500" />
            <StatCard title="Total Income" value="Rs. 12,00,000" color="bg-teal-600" />
        </div>
    </div>
  );
};

// Chota sa component cards k liye
const StatCard = ({ title, value, color }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">{title}</p>
        <h3 className="text-3xl font-bold text-gray-800 mt-2">{value}</h3>
        <div className={`h-1 w-12 ${color} rounded-full mt-4`}></div>
    </div>
);

export default Dashboard;