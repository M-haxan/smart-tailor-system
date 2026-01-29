import React from 'react';
import { 
  Users, Scissors, DollarSign, ShoppingBag, 
  TrendingUp, TrendingDown 
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar 
} from 'recharts';

const Dashbord = () => {

  // Dummy Data for Graph
  const data = [
    { name: 'Jan', income: 4000, orders: 24 },
    { name: 'Feb', income: 3000, orders: 13 },
    { name: 'Mar', income: 5000, orders: 38 },
    { name: 'Apr', income: 2780, orders: 30 },
    { name: 'May', income: 6890, orders: 48 },
    { name: 'Jun', income: 2390, orders: 25 },
    { name: 'Jul', income: 3490, orders: 43 },
  ];

  return (
    <div className="space-y-6">
      
      {/* 1. STATS CARDS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
        
        <StatCard 
            title="Total Customers" 
            value="1,240" 
            icon={Users} 
            color="bg-blue-500" 
            trend="+12% this month"
          />
          
          <StatCard 
            title="total cloth type" 
            value="45" 
            icon={Scissors} 
            color="bg-orange-500" 
            trend="5 urgent"
          />
          <StatCard 
            title="Total Income" 
            value="Rs. 1.2M" 
            icon={DollarSign} 
            color="bg-[#258C78]" 
            trend="+8% from last month"
          />
          <StatCard 
            title="Total Expense" 
            value="Rs. 40k" 
            icon={ShoppingBag} 
            color="bg-red-500" 
            trend="2% decrease"
          />
      </div>

      {/* 2. GRAPHS ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Graph (Income) - Takes 2 Columns */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
             <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-800">Income Analytics</h3>
                <select className="text-xs bg-gray-50 border border-gray-200 rounded-md p-1 outline-none">
                    <option>Last 6 Months</option>
                    <option>This Year</option>
                </select>
             </div>
             
             <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#258C78" stopOpacity={0.1}/>
                                <stop offset="95%" stopColor="#258C78" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0"/>
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9CA3AF'}} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9CA3AF'}} />
                        <Tooltip contentStyle={{borderRadius: '10px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)'}} />
                        <Area type="monotone" dataKey="income" stroke="#258C78" strokeWidth={3} fillOpacity={1} fill="url(#colorIncome)" />
                    </AreaChart>
                </ResponsiveContainer>
             </div>
          </div>

          {/* Side Graph (Orders) - Takes 1 Column */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
             <h3 className="font-bold text-gray-800 mb-6">Monthly Orders</h3>
             <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0"/>
                        <XAxis dataKey="name" hide />
                        <Tooltip cursor={{fill: 'transparent'}} />
                        <Bar dataKey="orders" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={20} />
                    </BarChart>
                </ResponsiveContainer>
             </div>
             <div className="mt-4 text-center">
                 <p className="text-sm text-gray-500">Total orders completed</p>
                 <h4 className="text-2xl font-bold text-gray-800">482</h4>
             </div>
          </div>

      </div>

    </div>
  );
};

// Reusable Stat Card Component
const StatCard = ({ title, value, icon: Icon, color, trend }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start">
            <div>
                <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
                <h3 className="text-sm font-bold text-gray-800">{value}</h3>
            </div>
            <div className={`p-3 rounded-xl text-white shadow-lg shadow-opacity-20 ${color}`}>
                <Icon size={14} />
            </div>
        </div>
        
    </div>
);

export default Dashbord;