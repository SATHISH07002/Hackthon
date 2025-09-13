import { Fragment, useState } from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import { Dialog, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  CubeIcon,
  TruckIcon,
  ChartBarIcon,
  UserIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline'
import { useAuthStore } from '../../store/auth'

export default function MainLayout() {
  const logout = useAuthStore((s) => s.logout)
  const profileImage = useAuthStore((s) => s.profileImage)
  const isDarkMode = useAuthStore((s) => s.isDarkMode)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navigation = [
    { name: 'Dashboard', href: '/', icon: HomeIcon },
    { name: 'Products', href: '/products', icon: CubeIcon },
    { name: 'Staff', href: '/staff', icon: UserGroupIcon },
    { name: 'Suppliers & PO', href: '/suppliers-po', icon: TruckIcon },
    { name: 'Sales & Expenses', href: '/sales-expenses', icon: ChartBarIcon },
    { name: 'Profile', href: '/profile', icon: UserIcon },
  ]

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-custom-dark' : 'bg-gray-50'}`}>
      {/* Mobile sidebar */}
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                      <XMarkIcon className="h-6 w-6 text-white" />
                    </button>
                  </div>
                </Transition.Child>
                <div className={`flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4 ${isDarkMode ? 'bg-custom-dark' : 'bg-white'}`}>
                  <div className="flex h-16 shrink-0 items-center">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-custom-mustard rounded-lg flex items-center justify-center">
                        <span className="text-custom-dark font-bold text-lg">T</span>
                      </div>
                      <div>
                        <h1 className={`text-xl font-bold ${isDarkMode ? 'text-custom-cream' : 'text-gray-900'}`}>TrackIt</h1>
                        <p className={`text-xs ${isDarkMode ? 'text-custom-cream' : 'text-gray-500'}`}>Inventory Management</p>
                      </div>
                    </div>
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" className="-mx-2 space-y-1">
                          {navigation.map((item) => (
                            <li key={item.name}>
                              <NavLink
                                to={item.href}
                                end={item.href === '/'}
                                className={({ isActive }) =>
                                  `group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold ${
                                    isActive
                                      ? isDarkMode 
                                        ? 'bg-custom-orange text-custom-dark' 
                                        : 'bg-primary-50 text-primary-600'
                                      : isDarkMode
                                        ? 'text-custom-cream hover:text-custom-mustard hover:bg-custom-orange'
                                        : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                                  }`
                                }
                                onClick={() => setSidebarOpen(false)}
                              >
                                <item.icon className="h-6 w-6 shrink-0" />
                                {item.name}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      </li>
                      <li className="mt-auto">
                        <button
                          onClick={logout}
                          className={`group flex w-full gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 hover:text-custom-mustard ${
                            isDarkMode 
                              ? 'text-custom-cream hover:bg-custom-orange' 
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <span>Logout</span>
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className={`flex grow flex-col gap-y-5 overflow-y-auto border-r px-6 pb-4 ${
          isDarkMode 
            ? 'bg-custom-dark border-custom-orange' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex h-16 shrink-0 items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-custom-mustard rounded-lg flex items-center justify-center">
                <span className="text-custom-dark font-bold text-lg">T</span>
              </div>
              <div>
                <h1 className={`text-xl font-bold ${isDarkMode ? 'text-custom-cream' : 'text-gray-900'}`}>TrackIt</h1>
                <p className={`text-xs ${isDarkMode ? 'text-custom-cream' : 'text-gray-500'}`}>Inventory Management</p>
              </div>
            </div>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <NavLink
                        to={item.href}
                        end={item.href === '/'}
                        className={({ isActive }) =>
                          `group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold ${
                            isActive
                              ? isDarkMode 
                                ? 'bg-custom-orange text-custom-dark' 
                                : 'bg-primary-50 text-primary-600'
                              : isDarkMode
                                ? 'text-custom-cream hover:text-custom-mustard hover:bg-custom-orange'
                                : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                          }`
                        }
                      >
                        <item.icon className="h-6 w-6 shrink-0" />
                        {item.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="mt-auto">
                <button
                  onClick={logout}
                  className={`group flex w-full gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 hover:text-custom-mustard ${
                    isDarkMode 
                      ? 'text-custom-cream hover:bg-custom-orange' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span>Logout</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-72">
        <div className={`sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8 ${
          isDarkMode 
            ? 'border-custom-orange bg-custom-dark' 
            : 'border-gray-200 bg-white'
        }`}>
            <button
              type="button"
              className={`-m-2.5 p-2.5 lg:hidden ${isDarkMode ? 'text-custom-cream' : 'text-gray-700'}`}
              onClick={() => setSidebarOpen(true)}
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1"></div>
            <div className="flex items-center justify-center flex-1">
              <div className="text-center">
                <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-custom-cream' : 'text-gray-900'}`}>STRIKERS</h1>
                <p className={`text-sm ${isDarkMode ? 'text-custom-cream' : 'text-gray-500'}`}>Inventory Management System</p>
              </div>
            </div>
            <div className="flex flex-1 justify-end items-center space-x-4">
              <span className={`text-sm ${isDarkMode ? 'text-custom-cream' : 'text-gray-500'}`}>Welcome back!</span>
              <div className={`h-8 w-8 rounded-full flex items-center justify-center overflow-hidden ${
                isDarkMode ? 'bg-custom-mustard' : 'bg-primary-100'
              }`}>
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="h-full w-full object-cover" />
                ) : (
                  <UserIcon className={`h-5 w-5 ${isDarkMode ? 'text-custom-dark' : 'text-primary-600'}`} />
                )}
              </div>
            </div>
          </div>
        </div>

        <main className="py-6">
          <div className="px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}


