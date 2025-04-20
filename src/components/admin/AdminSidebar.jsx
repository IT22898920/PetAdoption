import { Link, useLocation } from 'react-router-dom'
import {
  HomeIcon,
  UsersIcon,
  DocumentTextIcon,
  HeartIcon,
  XMarkIcon,
  BuildingOfficeIcon,
} from '@heroicons/react/24/outline'

const navigation = [
  { 
    name: 'Dashboard', 
    href: '/admin', 
    icon: HomeIcon,
    description: 'Overview and key metrics'
  },
  { 
    name: 'Manage Pets', 
    href: '/admin/pets', 
    icon: UsersIcon,
    description: 'Add and manage pet listings'
  },
  { 
    name: 'Applications', 
    href: '/admin/applications', 
    icon: DocumentTextIcon,
    description: 'Review adoption applications'
  },
  { 
    name: 'Donations', 
    href: '/admin/donations', 
    icon: HeartIcon,
    description: 'Track and manage donations'
  },
]

export default function AdminSidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation()

  return (
    <>
      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="relative z-50 lg:hidden">
          <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm" />
          <div className="fixed inset-0 flex">
            <div className="relative mr-16 flex w-full max-w-xs flex-1">
              <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                <button
                  type="button"
                  className="-m-2.5 p-2.5"
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="sr-only">Close sidebar</span>
                  <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
              <SidebarContent />
            </div>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72">
        <SidebarContent />
      </div>
    </>
  )
}

function SidebarContent() {
  const location = useLocation()
  
  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4 border-r border-gray-200">
      <div className="flex h-16 shrink-0 items-center border-b border-gray-200 w-full">
        <Link to="/" className="flex items-center gap-2">
          <BuildingOfficeIcon className="h-8 w-8 text-primary-600" />
          <span className="text-xl font-bold text-gray-900">
            Pet Adoption
          </span>
        </Link>
      </div>
      
      <nav className="flex flex-1 flex-col">
        <div className="space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`
                  group relative flex items-center gap-x-3 rounded-lg p-3 text-sm leading-6
                  transition-all duration-150 ease-in-out
                  ${isActive
                    ? 'bg-gray-50 text-primary-600 font-semibold'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-primary-600'
                  }
                `}
              >
                <div className={`
                  flex h-8 w-8 flex-none items-center justify-center rounded-lg
                  transition-colors duration-150 ease-in-out
                  ${isActive
                    ? 'bg-primary-50 text-primary-600'
                    : 'bg-gray-50 text-gray-400 group-hover:bg-gray-100 group-hover:text-primary-600'
                  }
                `}>
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="flex-auto">
                  <span className="block">{item.name}</span>
                  <span className={`
                    block text-xs
                    ${isActive ? 'text-primary-600/80' : 'text-gray-500'}
                  `}>
                    {item.description}
                  </span>
                </div>
                {isActive && (
                  <div className="absolute inset-y-0 right-0 w-1 bg-primary-600 rounded-l-lg" />
                )}
              </Link>
            )
          })}
        </div>

        <div className="mt-auto pt-6 border-t border-gray-200">
          <div className="space-y-3">
            <div className="px-3">
              <p className="text-xs font-medium text-gray-500 uppercase">Admin Info</p>
              <div className="mt-2 flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-900">
                <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600">A</span>
                </div>
                <div className="flex-1 truncate">
                  <div className="text-sm font-medium text-gray-900">Admin User</div>
                  <div className="text-xs text-gray-500">admin@example.com</div>
                </div>
              </div>
            </div>
            
            <Link
              to="/admin/settings"
              className="group flex items-center gap-x-3 rounded-lg p-3 text-sm leading-6 text-gray-700 hover:bg-gray-50 hover:text-primary-600"
            >
              <span className="truncate">Settings</span>
            </Link>
            <button
              onClick={() => {/* Handle logout */}}
              className="w-full flex items-center gap-x-3 rounded-lg p-3 text-sm leading-6 text-gray-700 hover:bg-gray-50 hover:text-red-600"
            >
              <span className="truncate">Sign out</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  )
}