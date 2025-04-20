import { useState } from 'react'
import { format } from 'date-fns'
import { 
  MagnifyingGlassIcon,
  ChevronDownIcon,
  DocumentArrowDownIcon
} from '@heroicons/react/24/outline'
import { generateDonationReceipt as generateReceipt } from '../../utils/pdfGenerator'

const MOCK_DONATIONS = [
  {
    id: 1,
    donor: 'John Doe',
    email: 'john@example.com',
    amount: 5000,
    purpose: 'Medical Care',
    date: '2024-02-25T10:30:00Z',
    message: 'Hope this helps with veterinary expenses'
  },
  {
    id: 2,
    donor: 'Jane Smith',
    email: 'jane@example.com',
    amount: 2000,
    purpose: 'Food & Supplies',
    date: '2024-02-24T15:45:00Z',
    message: 'Monthly contribution for pet food'
  },
  {
    id: 3,
    donor: 'Mike Johnson',
    email: 'mike@example.com',
    amount: 10000,
    purpose: 'Shelter Maintenance',
    date: '2024-02-23T09:15:00Z',
    message: 'For shelter improvements'
  }
]

export default function Donations() {
  const [donations] = useState(MOCK_DONATIONS)
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState({
    purpose: '',
    dateRange: '',
    amountRange: ''
  })

  const filteredDonations = donations.filter(donation => {
    const matchesSearch = 
      donation.donor.toLowerCase().includes(search.toLowerCase()) ||
      donation.email.toLowerCase().includes(search.toLowerCase())
    
    const matchesPurpose = !filters.purpose || donation.purpose === filters.purpose
    const matchesDate = !filters.dateRange || (
      filters.dateRange === 'today' ? 
        new Date(donation.date).toDateString() === new Date().toDateString() :
      filters.dateRange === 'week' ? 
        new Date(donation.date) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) :
      filters.dateRange === 'month' ? 
        new Date(donation.date) >= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) :
      true
    )
    const matchesAmount = !filters.amountRange || (
      filters.amountRange === '0-1000' ? donation.amount <= 1000 :
      filters.amountRange === '1001-5000' ? donation.amount > 1000 && donation.amount <= 5000 :
      filters.amountRange === '5001+' ? donation.amount > 5000 : true
    )

    return matchesSearch && matchesPurpose && matchesDate && matchesAmount
  })

  const totalDonations = filteredDonations.reduce((sum, donation) => sum + donation.amount, 0)

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Donations</h1>
          <p className="mt-1 text-sm text-gray-500">
            Track and manage donations from supporters
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search donations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="block w-full rounded-lg border-0 py-2.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
            />
          </div>

          <div className="relative">
            <select
              value={filters.purpose}
              onChange={(e) => setFilters({ ...filters, purpose: e.target.value })}
              className="block w-full rounded-lg border-0 py-2.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
            >
              <option value="">All Purposes</option>
              <option value="Food & Supplies">Food & Supplies</option>
              <option value="Medical Care">Medical Care</option>
              <option value="Shelter Maintenance">Shelter Maintenance</option>
              <option value="General Support">General Support</option>
            </select>
            <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          </div>

          <div className="relative">
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
            <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          </div>

          <div className="relative">
            <select
              value={filters.amountRange}
              onChange={(e) => setFilters({ ...filters, amountRange: e.target.value })}
              className="block w-full rounded-lg border-0 py-2.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
            >
              <option value="">All Amounts</option>
              <option value="0-1000">Up to LKR 1,000</option>
              <option value="1001-5000">LKR 1,001 - 5,000</option>
              <option value="5001+">LKR 5,001+</option>
            </select>
            <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <div className="mt-6 bg-gray-50 rounded-lg p-4">
          <p className="text-sm font-medium text-gray-500">
            Total Donations: <span className="text-gray-900">LKR {totalDonations.toLocaleString()}</span>
          </p>
        </div>
      </div>

      <div className="flow-root">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                  Donor
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Amount
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Purpose
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Date
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredDonations.map((donation) => (
                <tr key={donation.id} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 sm:pl-6">
                    <div>
                      <div className="font-medium text-gray-900">{donation.donor}</div>
                      <div className="text-gray-500">{donation.email}</div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                    <div className="font-medium text-gray-900">
                      LKR {donation.amount.toLocaleString()}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {donation.purpose}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {format(new Date(donation.date), 'MMM d, yyyy')}
                  </td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <button
                      onClick={() => generateReceipt(donation)}
                      className="text-primary-600 hover:text-primary-900"
                      title="Download Receipt"
                    >
                      <DocumentArrowDownIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredDonations.length === 0 && (
            <div className="text-center py-12">
              <p className="text-sm text-gray-500">No donations found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}