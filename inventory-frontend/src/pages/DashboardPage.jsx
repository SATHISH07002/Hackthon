import { useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'
import { 
  CubeIcon, 
  ExclamationTriangleIcon, 
  TruckIcon, 
  CurrencyRupeeIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon
} from '@heroicons/react/24/outline'

export default function DashboardPage() {
  const data = useMemo(() => (
    Array.from({ length: 12 }).map((_, i) => ({ 
      month: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][i], 
      sales: Math.round(Math.random()*8000)+2000,
      expenses: Math.round(Math.random()*3000)+1000
    }))
  ), [])

  const pieData = [
    { name: 'Products', value: 324, color: '#6366f1' },
    { name: 'Low Stock', value: 18, color: '#f59e0b' },
    { name: 'Out of Stock', value: 5, color: '#ef4444' },
  ]

  const kpis = [
    { 
      name: 'Total Products', 
      value: '324', 
      change: '+12%', 
      changeType: 'positive',
      icon: CubeIcon,
      color: 'bg-blue-500'
    },
    { 
      name: 'Low Stock Items', 
      value: '18', 
      change: '-3%', 
      changeType: 'negative',
      icon: ExclamationTriangleIcon,
      color: 'bg-yellow-500'
    },
    { 
      name: 'Open POs', 
      value: '7', 
      change: '+2', 
      changeType: 'positive',
      icon: TruckIcon,
      color: 'bg-green-500'
    },
    { 
      name: 'Monthly Sales', 
      value: 'Rs 42,380', 
      change: '+8.2%', 
      changeType: 'positive',
      icon: CurrencyRupeeIcon,
      color: 'bg-purple-500'
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">Welcome back! Here's what's happening with your inventory.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <div key={kpi.name} className="relative overflow-hidden rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
            <div className="flex items-center">
              <div className={`rounded-lg p-3 ${kpi.color}`}>
                <kpi.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-gray-600">{kpi.name}</p>
                <p className="text-2xl font-semibold text-gray-900">{kpi.value}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              {kpi.changeType === 'positive' ? (
                <ArrowTrendingUpIcon className="h-4 w-4 text-green-500" />
              ) : (
                <ArrowTrendingDownIcon className="h-4 w-4 text-red-500" />
              )}
              <span className={`ml-1 text-sm font-medium ${
                kpi.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {kpi.change}
              </span>
              <span className="ml-1 text-sm text-gray-500">from last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Sales Overview */}
        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Sales Overview</h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-primary-500"></div>
                <span className="text-sm text-gray-500">Sales</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-500">Expenses</span>
              </div>
            </div>
          </div>
          <div className="mt-6 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis 
                  dataKey="month" 
                  tickLine={false} 
                  axisLine={false}
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                />
                <YAxis 
                  tickLine={false} 
                  axisLine={false}
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar 
                  dataKey="sales" 
                  fill="#6366f1" 
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="expenses" 
                  fill="#10b981" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Inventory Status */}
        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Inventory Status</h3>
          <div className="mt-6 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {pieData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="ml-2 text-sm text-gray-600">{item.name}</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        <div className="mt-6 space-y-4">
          {[
            { action: 'New product added', item: 'T-Shirt Black (M)', time: '2 hours ago', type: 'add' },
            { action: 'Stock updated', item: 'Coffee Ground 250g', time: '4 hours ago', type: 'update' },
            { action: 'Purchase order created', item: 'PO-1008', time: '6 hours ago', type: 'order' },
            { action: 'Low stock alert', item: 'Jeans Blue (L)', time: '1 day ago', type: 'alert' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className={`h-2 w-2 rounded-full ${
                activity.type === 'add' ? 'bg-green-500' :
                activity.type === 'update' ? 'bg-blue-500' :
                activity.type === 'order' ? 'bg-purple-500' : 'bg-yellow-500'
              }`}></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">{activity.action}</p>
                <p className="text-sm text-gray-500">{activity.item}</p>
              </div>
              <p className="text-sm text-gray-400">{activity.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


