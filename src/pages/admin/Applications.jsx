import { useState } from 'react'
import { 
  CheckCircleIcon, 
  XCircleIcon, 
  MagnifyingGlassIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline'

export default function Applications() {
  const [applications, setApplications] = useState([
    {
      id: 1,
      applicant: 'John Doe',
      pet: 'Max',
      email: 'john@example.com',
      phone: '(555) 123-4567',
      status: 'Pending',
      date: '2024-02-20',
      type: 'Dog',
    },
    {
      id: 2,
      applicant: 'Jane Smith',
      pet: 'Luna',
      email: 'jane@example.com',
      phone: '(555) 987-6543',
      status: 'Pending',
      date: '2024-02-19',
      type: 'Cat',
    },
    {
      id: 3,
      applicant: 'Mike Johnson',
      pet: 'Rocky',
      email: 'mike@example.com',
      phone: '(555) 456-7890',
      status: 'Approved',
      date: '2024-02-18',
      type: 'Dog',
    },
    {
      id: 4,
      applicant: 'Sarah Wilson',
      pet: 'Milo',
      email: 'sarah@example.com',
      phone: '(555) 234-5678',
      status: 'Rejected',
      date: '2024-02-17',
      type: 'Cat',
    },
  ])

  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState({
    status: '',
    petType: '',
    dateRange: '',
  })
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [selectedAction, setSelectedAction] = useState(null)
  const [selectedApplication, setSelectedApplication] = useState(null)

  const handleStatusChange = (applicationId, newStatus) => {
    setSelectedApplication(applicationId)
    setSelectedAction(newStatus)
    setShowConfirmModal(true)
  }

  const confirmStatusChange = () => {
    setApplications(applications.map(app => 
      app.id === selectedApplication 
        ? { ...app, status: selectedAction }
        : app
    ))
    setShowConfirmModal(false)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800'
      case 'Rejected':
        return 'bg-red-100 text-red-800'
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      app.applicant.toLowerCase().includes(search.toLowerCase()) ||
      app.pet.toLowerCase().includes(search.toLowerCase()) ||
      app.email.toLowerCase().includes(search.toLowerCase())
    
    const matchesStatus = !filters.status || app.status === filters.status
    const matchesPetType = !filters.petType || app.type === filters.petType
    const matchesDate = !filters.dateRange || (
      filters.dateRange === 'today' ? app.date === new Date().toISOString().split('T')[0] :
      filters.dateRange === 'week' ? new Date(app.date) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) :
      filters.dateRange === 'month' ? new Date(app.date) >= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) :
      true
    )

    return matchesSearch && matchesStatus && matchesPetType && matchesDate
  })

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Adoption Applications</h1>
          <p className="mt-1 text-sm text-gray-500">
            Review and manage adoption applications from potential pet parents
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search Bar */}
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search applications..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="block w-full rounded-lg border-0 py-2.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
            />
          </div>

          {/* Filter Dropdowns */}
          <div>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="block w-full rounded-lg border-0 py-2.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
            >
              <option value="">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div>
            <select
              value={filters.petType}
              onChange={(e) => setFilters({ ...filters, petType: e.target.value })}
              className="block w-full rounded-lg border-0 py-2.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
            >
              <option value="">All Pet Types</option>
              <option value="Dog">Dogs</option>
              <option value="Cat">Cats</option>
            </select>
          </div>

          <div>
            <select
              value={filters.dateRange}
              onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
              className="block w-full rounded-lg border-0 py-2.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
            >
              <option value="">All Dates</option>
              <option value="today">Today</option>
              <option value="week">Past Week</option>
              <option value="month">Past Month</option>
            </select>
          </div>
        </div>

        {/* Active Filters */}
        {(filters.status || filters.petType || filters.dateRange) && (
          <div className="flex flex-wrap gap-2 mt-4">
            {filters.status && (
              <span className="inline-flex items-center rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-700">
                {filters.status}
                <button
                  type="button"
                  onClick={() => setFilters({ ...filters, status: '' })}
                  className="ml-1 inline-flex h-4 w-4 items-center justify-center rounded-full hover:bg-primary-200"
                >
                  ×
                </button>
              </span>
            )}
            {filters.petType && (
              <span className="inline-flex items-center rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-700">
                {filters.petType}
                <button
                  type="button"
                  onClick={() => setFilters({ ...filters, petType: '' })}
                  className="ml-1 inline-flex h-4 w-4 items-center justify-center rounded-full hover:bg-primary-200"
                >
                  ×
                </button>
              </span>
            )}
            {filters.dateRange && (
              <span className="inline-flex items-center rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-700">
                {filters.dateRange === 'today' ? 'Today' :
                 filters.dateRange === 'week' ? 'Past Week' :
                 'Past Month'}
                <button
                  type="button"
                  onClick={() => setFilters({ ...filters, dateRange: '' })}
                  className="ml-1 inline-flex h-4 w-4 items-center justify-center rounded-full hover:bg-primary-200"
                >
                  ×
                </button>
              </span>
            )}
            <button
              type="button"
              onClick={() => setFilters({ status: '', petType: '', dateRange: '' })}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Applications Table */}
      <div className="flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                    Applicant
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Pet
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Contact
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Date
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredApplications.map((application) => (
                  <tr key={application.id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      {application.applicant}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <div>
                        <span className="font-medium text-gray-900">{application.pet}</span>
                        <span className="text-gray-500"> • {application.type}</span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <div>
                        <div className="text-gray-900">{application.email}</div>
                        <div className="text-gray-500">{application.phone}</div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {application.date}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getStatusColor(application.status)}`}>
                        {application.status}
                      </span>
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      {application.status === 'Pending' && (
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleStatusChange(application.id, 'Approved')}
                            className="text-green-600 hover:text-green-900 transition-colors p-1 rounded-full hover:bg-green-50"
                            title="Approve"
                          >
                            <CheckCircleIcon className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleStatusChange(application.id, 'Rejected')}
                            className="text-red-600 hover:text-red-900 transition-colors p-1 rounded-full hover:bg-red-50"
                            title="Reject"
                          >
                            <XCircleIcon className="h-5 w-5" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredApplications.length === 0 && (
              <div className="text-center py-12">
                <p className="text-sm text-gray-500">No applications found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-50">
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-yellow-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationCircleIcon className="h-6 w-6 text-yellow-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3 className="text-base font-semibold leading-6 text-gray-900">
                      Confirm Application {selectedAction}
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to {selectedAction.toLowerCase()} this adoption application? This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto ${
                      selectedAction === 'Approved' 
                        ? 'bg-green-600 hover:bg-green-500'
                        : 'bg-red-600 hover:bg-red-500'
                    }`}
                    onClick={confirmStatusChange}
                  >
                    Confirm
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setShowConfirmModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}