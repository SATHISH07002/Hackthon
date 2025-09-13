import { useMemo, useEffect, useState } from 'react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'
import { 
  CubeIcon, 
  ExclamationTriangleIcon, 
  TruckIcon, 
  CurrencyRupeeIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  BellIcon,
  ClockIcon,
  XMarkIcon,
  UserGroupIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  CalendarDaysIcon,
  BriefcaseIcon
} from '@heroicons/react/24/outline'
import { useAuthStore } from '../store/auth'

export default function DashboardPage() {
  const { 
    remainderAlerts, 
    remainderSettings, 
    removeRemainderAlert, 
    clearAllAlerts, 
    isDarkMode, 
    staff,
    dashboardStats,
    fetchDashboardStats,
    fetchLowStockAlerts,
    fetchStaff,
    loading
  } = useAuthStore()
  
  const [chartData, setChartData] = useState([])
  const [inventoryStatus, setInventoryStatus] = useState([])

  // Fetch dashboard data on component mount
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        await Promise.all([
          fetchDashboardStats(),
          fetchLowStockAlerts(),
          fetchStaff()
        ])
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error)
      }
    }

    fetchDashboardData()
  }, [fetchDashboardStats, fetchLowStockAlerts, fetchStaff])

  // Use real data from backend or fallback to sample data
  const data = useMemo(() => {
    if (chartData.length > 0) return chartData
    return Array.from({ length: 12 }).map((_, i) => ({ 
      month: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][i], 
      sales: Math.round(Math.random()*8000)+2000,
      expenses: Math.round(Math.random()*3000)+1000
    }))
  }, [chartData])

  const pieData = useMemo(() => {
    if (inventoryStatus.length > 0) return inventoryStatus
    return [
      { name: 'Products', value: 324, color: '#DAA520' },
      { name: 'Low Stock', value: 18, color: '#FF6F61' },
      { name: 'Out of Stock', value: 5, color: '#FF4500' },
    ]
  }, [inventoryStatus])

  const kpis = useMemo(() => {
    if (dashboardStats?.kpis) return dashboardStats.kpis
    return [
      { 
        name: 'Total Products', 
        value: '324', 
        change: '+12%', 
        changeType: 'positive',
        icon: CubeIcon,
        color: 'bg-custom-mustard'
      },
      { 
        name: 'Low Stock Items', 
        value: '18', 
        change: '-3%', 
        changeType: 'negative',
        icon: ExclamationTriangleIcon,
        color: 'bg-custom-coral'
      },
      { 
        name: 'Open POs', 
        value: '7', 
        change: '+2', 
        changeType: 'positive',
        icon: TruckIcon,
        color: 'bg-custom-orange'
      },
      { 
        name: 'Monthly Sales', 
        value: 'Rs 42,380', 
        change: '+8.2%', 
        changeType: 'positive',
        icon: CurrencyRupeeIcon,
        color: 'bg-custom-mustard'
      },
    ]
  }, [dashboardStats])

  return (
    <div className={`space-y-8 ${isDarkMode ? 'bg-custom-dark' : 'bg-gray-50'}`}>
      {/* Header */}
      <div>
        <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-custom-cream' : 'text-gray-900'}`}>Dashboard</h1>
        <p className={`mt-1 text-sm ${isDarkMode ? 'text-custom-cream' : 'text-gray-500'}`}>Welcome back! Here's what's happening with your inventory.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <div key={kpi.name} className={`relative overflow-hidden rounded-xl p-6 shadow-sm ring-1 ${
            isDarkMode 
              ? 'bg-custom-dark ring-custom-orange' 
              : 'bg-white ring-gray-200'
          }`}>
            <div className="flex items-center">
              <div className={`rounded-lg p-3 ${kpi.color}`}>
                <kpi.icon className="h-6 w-6 text-custom-dark" />
              </div>
              <div className="ml-4 flex-1">
                <p className={`text-sm font-medium ${isDarkMode ? 'text-custom-cream' : 'text-gray-600'}`}>{kpi.name}</p>
                <p className={`text-2xl font-semibold ${isDarkMode ? 'text-custom-cream' : 'text-gray-900'}`}>{kpi.value}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              {kpi.changeType === 'positive' ? (
                <ArrowTrendingUpIcon className="h-4 w-4 text-custom-mustard" />
              ) : (
                <ArrowTrendingDownIcon className="h-4 w-4 text-custom-coral" />
              )}
              <span className={`ml-1 text-sm font-medium ${
                kpi.changeType === 'positive' ? 'text-custom-mustard' : 'text-custom-coral'
              }`}>
                {kpi.change}
              </span>
              <span className={`ml-1 text-sm ${isDarkMode ? 'text-custom-cream' : 'text-gray-500'}`}>from last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Sales Overview */}
        <div className={`rounded-xl p-6 shadow-sm ring-1 ${
          isDarkMode 
            ? 'bg-custom-dark ring-custom-orange' 
            : 'bg-white ring-gray-200'
        }`}>
          <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-custom-cream' : 'text-gray-900'}`}>Sales & Expenses Overview</h3>
          <div className="mt-4 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#FF6F61' : '#e5e7eb'} />
                <XAxis dataKey="month" stroke={isDarkMode ? '#F5E8D8' : '#6b7280'} />
                <YAxis stroke={isDarkMode ? '#F5E8D8' : '#6b7280'} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: isDarkMode ? '#1C1C1C' : '#ffffff',
                    border: isDarkMode ? '1px solid #FF6F61' : '1px solid #e5e7eb',
                    borderRadius: '8px',
                    color: isDarkMode ? '#F5E8D8' : '#000000'
                  }}
                />
                <Bar dataKey="sales" fill="#DAA520" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expenses" fill="#FF6F61" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Inventory Status */}
        <div className={`rounded-xl p-6 shadow-sm ring-1 ${
          isDarkMode 
            ? 'bg-custom-dark ring-custom-orange' 
            : 'bg-white ring-gray-200'
        }`}>
          <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-custom-cream' : 'text-gray-900'}`}>Inventory Status</h3>
          <div className="mt-4 h-80">
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
                <Tooltip 
                  contentStyle={{
                    backgroundColor: isDarkMode ? '#1C1C1C' : '#ffffff',
                    border: isDarkMode ? '1px solid #FF6F61' : '1px solid #e5e7eb',
                    borderRadius: '8px',
                    color: isDarkMode ? '#F5E8D8' : '#000000'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex justify-center space-x-6">
            {pieData.map((item) => (
              <div key={item.name} className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                <span className={`text-sm ${isDarkMode ? 'text-custom-cream' : 'text-gray-600'}`}>{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Remainder Alerts */}
      {remainderAlerts.length > 0 && (
        <div className={`rounded-xl p-6 shadow-sm ring-1 ${
          isDarkMode 
            ? 'bg-custom-dark ring-custom-orange' 
            : 'bg-white ring-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-custom-cream' : 'text-gray-900'}`}>
              Low Stock Alerts
            </h3>
            <button
              onClick={clearAllAlerts}
              className={`text-sm ${isDarkMode ? 'text-custom-cream hover:text-custom-mustard' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Clear All
            </button>
          </div>
          <div className="space-y-3">
            {remainderAlerts.map((alert) => (
              <div key={alert.id} className={`flex items-center justify-between p-3 rounded-lg ${
                isDarkMode ? 'bg-custom-orange' : 'bg-gray-50'
              }`}>
                <div className="flex items-center space-x-3">
                  <BellIcon className={`h-5 w-5 ${
                    alert.priority === 'critical' ? 'text-custom-coral' : 'text-custom-mustard'
                  }`} />
                  <div>
                    <p className={`font-medium ${isDarkMode ? 'text-custom-dark' : 'text-gray-900'}`}>
                      {alert.productName}
                    </p>
                    <p className={`text-sm ${isDarkMode ? 'text-custom-dark' : 'text-gray-500'}`}>
                      {alert.category} • Only {alert.currentStock} left (was {alert.originalStock})
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeRemainderAlert(alert.productId)}
                  className={`p-1 rounded-md ${isDarkMode ? 'hover:bg-custom-coral' : 'hover:bg-gray-200'}`}
                >
                  <XMarkIcon className="h-4 w-4 text-custom-dark" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Staff Overview */}
      <div className={`rounded-xl p-6 shadow-sm ring-1 ${
        isDarkMode 
          ? 'bg-custom-dark ring-custom-orange' 
          : 'bg-white ring-gray-200'
      }`}>
        <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-custom-cream' : 'text-gray-900'}`}>
          Staff Overview
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {staff.map((member) => (
            <div key={member.id} className={`p-4 rounded-lg border ${
              isDarkMode 
                ? 'bg-custom-orange border-custom-coral' 
                : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-custom-mustard rounded-full flex items-center justify-center">
                  <span className="text-custom-dark font-semibold text-sm">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1">
                  <p className={`font-medium ${isDarkMode ? 'text-custom-dark' : 'text-gray-900'}`}>
                    {member.name}
                  </p>
                  <p className={`text-sm ${isDarkMode ? 'text-custom-dark' : 'text-gray-500'}`}>
                    {member.position}
                  </p>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <div className="flex items-center space-x-2">
                  <PhoneIcon className="h-4 w-4 text-custom-dark" />
                  <span className={`text-sm ${isDarkMode ? 'text-custom-dark' : 'text-gray-600'}`}>
                    {member.phone}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPinIcon className="h-4 w-4 text-custom-dark" />
                  <span className={`text-sm ${isDarkMode ? 'text-custom-dark' : 'text-gray-600'}`}>
                    {member.address}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <CalendarDaysIcon className="h-4 w-4 text-custom-dark" />
                  <span className={`text-sm ${isDarkMode ? 'text-custom-dark' : 'text-gray-600'}`}>
                    Joined: {member.joinDate}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <BriefcaseIcon className="h-4 w-4 text-custom-dark" />
                  <span className={`text-sm ${isDarkMode ? 'text-custom-dark' : 'text-gray-600'}`}>
                    Experience: {member.experience}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <CurrencyRupeeIcon className="h-4 w-4 text-custom-dark" />
                  <span className={`text-sm ${isDarkMode ? 'text-custom-dark' : 'text-gray-600'}`}>
                    Salary: Rs {member.salary}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}