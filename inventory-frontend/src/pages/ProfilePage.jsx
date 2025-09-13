import { useState } from 'react'
import { useAuthStore } from '../store/auth'
import {
  UserIcon,
  BuildingStorefrontIcon, 
  CogIcon,
  BellIcon,
  PhoneIcon,
  DevicePhoneMobileIcon,
  ClockIcon
} from '@heroicons/react/24/outline'

export default function ProfilePage() {
  const user = useAuthStore((s) => s.user)
  const profileImage = useAuthStore((s) => s.profileImage)
  const setProfileImage = useAuthStore((s) => s.setProfileImage)
  const isDarkMode = useAuthStore((s) => s.isDarkMode)
  const toggleDarkMode = useAuthStore((s) => s.toggleDarkMode)
  const remainderSettings = useAuthStore((s) => s.remainderSettings)
  const updateRemainderSettings = useAuthStore((s) => s.updateRemainderSettings)
  const [activeTab, setActiveTab] = useState('profile')
  const [previewImage, setPreviewImage] = useState(profileImage)

  const tabs = [
    { id: 'profile', name: 'Profile', icon: UserIcon },
    { id: 'store', name: 'Store Info', icon: BuildingStorefrontIcon },
    { id: 'settings', name: 'Settings', icon: CogIcon },
    { id: 'notifications', name: 'Messages', icon: DevicePhoneMobileIcon },
  ]

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageData = e.target.result
        setPreviewImage(imageData)
        setProfileImage(imageData)
      }
      reader.readAsDataURL(file)
    }
  }


  return (
    <div className={`space-y-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
      {/* Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl opacity-10"></div>
        <div className={`relative backdrop-blur-sm rounded-2xl p-6 border ${
          isDarkMode 
            ? 'bg-gray-800/80 border-gray-700' 
            : 'bg-white/80 border-gray-200'
        }`}>
          <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Profile & Settings</h1>
          <p className={`mt-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Manage your account and store preferences
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium rounded-t-lg transition-all duration-200 ${
                activeTab === tab.id
                  ? isDarkMode
                    ? 'border-primary-400 text-primary-400 bg-primary-900/20'
                    : 'border-primary-500 text-primary-600 bg-primary-50'
                  : isDarkMode
                    ? 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600 hover:bg-gray-700/50'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <tab.icon className="h-5 w-5" />
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="space-y-6">
          <div className={`rounded-2xl p-8 shadow-lg ring-1 backdrop-blur-sm ${
            isDarkMode 
              ? 'bg-gray-800/80 ring-gray-700' 
              : 'bg-white/80 ring-gray-200'
          }`}>
            <div className="flex items-center space-x-8">
              <div className="relative group">
                <div className={`h-24 w-24 rounded-full flex items-center justify-center overflow-hidden ring-4 ring-offset-4 transition-all duration-300 group-hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-primary-900 ring-primary-400 ring-offset-gray-800' 
                    : 'bg-primary-100 ring-primary-200 ring-offset-white'
                }`}>
                  {previewImage ? (
                    <img src={previewImage} alt="Profile" className="h-full w-full object-cover" />
                  ) : (
                    <UserIcon className={`h-12 w-12 ${isDarkMode ? 'text-primary-400' : 'text-primary-600'}`} />
                  )}
                </div>
                <label className="absolute -bottom-2 -right-2 bg-primary-600 text-white rounded-full p-2 cursor-pointer hover:bg-primary-700 transition-all duration-200 hover:scale-110 shadow-lg">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </label>
              </div>
              <div className="flex-1">
                <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {user?.name || 'Store Owner'}
                </h3>
                <p className={`text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {user?.email || 'owner@strikers.com'}
                </p>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Store Owner • STRIKERS
                </p>
                <div className="mt-3">
                  <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
                    isDarkMode 
                      ? 'bg-green-900/30 text-green-400 border border-green-800' 
                      : 'bg-green-100 text-green-800 border border-green-200'
                  }`}>
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Store Info Tab */}
      {activeTab === 'store' && (
        <div className="space-y-6">
          <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Store Information</h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Store Name</label>
                <input type="text" value="STRIKERS" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Store Type</label>
                <input type="text" value="Retail Store" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input type="text" value="123 Main Street, City" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input type="text" value="+1 (555) 123-4567" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" />
              </div>
            </div>
            <div className="mt-6">
              <button className="btn-primary">Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="space-y-6">
          {/* Remainder Settings */}
          <div className={`rounded-2xl p-8 shadow-lg ring-1 backdrop-blur-sm ${
            isDarkMode 
              ? 'bg-gray-800/80 ring-gray-700' 
              : 'bg-white/80 ring-gray-200'
          }`}>
            <div className="flex items-center space-x-3 mb-6">
              <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-primary-900/50' : 'bg-primary-100'}`}>
                <BellIcon className={`h-6 w-6 ${isDarkMode ? 'text-primary-400' : 'text-primary-600'}`} />
              </div>
              <div>
                <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Remainder Settings</h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Configure low stock alerts and notifications</p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Enable Remainder Alerts */}
              <div className={`p-6 rounded-xl border ${
                isDarkMode 
                  ? 'bg-gray-700/50 border-gray-600' 
                  : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Enable Remainder Alerts</h4>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Get notified when products reach low stock levels</p>
                  </div>
                  <button
                    onClick={() => updateRemainderSettings({ enabled: !remainderSettings.enabled })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                      remainderSettings.enabled ? 'bg-primary-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        remainderSettings.enabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Threshold Setting */}
              <div className={`p-6 rounded-xl border ${
                isDarkMode 
                  ? 'bg-gray-700/50 border-gray-600' 
                  : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="space-y-4">
                  <div>
                    <h4 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Alert Threshold</h4>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>When to trigger low stock alerts</p>
                  </div>
                  <div className="space-y-3">
                    {[
                      { value: 0.1, label: '10% of original stock', desc: 'Very early warning' },
                      { value: 0.25, label: '25% of original stock', desc: 'Recommended setting' },
                      { value: 0.5, label: '50% of original stock', desc: 'Late warning' }
                    ].map((option) => (
                      <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="threshold"
                          value={option.value}
                          checked={remainderSettings.threshold === option.value}
                          onChange={(e) => updateRemainderSettings({ threshold: parseFloat(e.target.value) })}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                        />
                        <div>
                          <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{option.label}</div>
                          <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{option.desc}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Reminder Time */}
              <div className={`p-6 rounded-xl border ${
                isDarkMode 
                  ? 'bg-gray-700/50 border-gray-600' 
                  : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="space-y-4">
                  <div>
                    <h4 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Reminder Time</h4>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>When to send daily remainder notifications</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <ClockIcon className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    <input
                      type="time"
                      value={remainderSettings.reminderTime}
                      onChange={(e) => updateRemainderSettings({ reminderTime: e.target.value })}
                      className={`px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                        isDarkMode 
                          ? 'bg-gray-800 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Notification Method */}
              <div className={`p-6 rounded-xl border ${
                isDarkMode 
                  ? 'bg-gray-700/50 border-gray-600' 
                  : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="space-y-4">
                  <div>
                    <h4 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Notification Method</h4>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>How you want to receive remainder alerts</p>
                  </div>
                  <div className="space-y-3">
                    {[
                      { value: 'dashboard', label: 'Dashboard Only', desc: 'Show alerts in the dashboard' },
                      { value: 'email', label: 'Email Notifications', desc: 'Send alerts via email' },
                      { value: 'sms', label: 'SMS Notifications', desc: 'Send alerts via text message' }
                    ].map((option) => (
                      <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="notificationMethod"
                          value={option.value}
                          checked={remainderSettings.notificationMethod === option.value}
                          onChange={(e) => updateRemainderSettings({ notificationMethod: e.target.value })}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                        />
                        <div>
                          <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{option.label}</div>
                          <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{option.desc}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* General Settings */}
          <div className={`rounded-2xl p-8 shadow-lg ring-1 backdrop-blur-sm ${
            isDarkMode 
              ? 'bg-gray-800/80 ring-gray-700' 
              : 'bg-white/80 ring-gray-200'
          }`}>
            <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-6`}>General Settings</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Dark Mode</h4>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>Switch to dark theme</p>
                </div>
                <button
                  onClick={toggleDarkMode}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                    isDarkMode ? 'bg-primary-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      isDarkMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="space-y-6">
          <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Notifications</h3>
            <div className="space-y-4">
              {[
                { message: 'Low stock alert: Coffee Ground 250g', time: '2 hours ago', type: 'warning' },
                { message: 'New order received: PO-1008', time: '4 hours ago', type: 'info' },
                { message: 'Product added: T-Shirt Black (M)', time: '6 hours ago', type: 'success' },
                { message: 'Monthly report generated', time: '1 day ago', type: 'info' },
              ].map((notification, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                  <div className={`h-2 w-2 rounded-full mt-2 ${
                    notification.type === 'warning' ? 'bg-yellow-500' :
                    notification.type === 'info' ? 'bg-blue-500' : 'bg-green-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{notification.message}</p>
                    <p className="text-xs text-gray-500">{notification.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


