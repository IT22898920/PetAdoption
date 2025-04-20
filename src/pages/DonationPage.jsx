import { useState } from 'react'
import { CurrencyDollarIcon, HeartIcon, CheckCircleIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline'
import { generateDonationReceipt } from '../utils/pdfGenerator'

const DONATION_PURPOSES = [
  { id: 'food', label: 'Food & Supplies', description: 'Help us feed and care for our pets' },
  { id: 'medical', label: 'Medical Care', description: 'Support veterinary care and treatments' },
  { id: 'shelter', label: 'Shelter Maintenance', description: 'Help maintain and improve our facilities' },
  { id: 'general', label: 'General Support', description: 'Support our overall mission' },
]

export default function DonationPage() {
  const [formData, setFormData] = useState({
    amount: '',
    purpose: '',
    name: '',
    email: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [selectedPurpose, setSelectedPurpose] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically handle the donation processing
    setSubmitted(true)
  }

  if (submitted) {
    const handleDownloadReceipt = () => {
      generateDonationReceipt({
        id: Date.now(), // Generate a temporary ID
        donor: formData.name,
        email: formData.email,
        amount: parseInt(formData.amount),
        purpose: DONATION_PURPOSES.find(p => p.id === formData.purpose)?.label,
        date: new Date().toISOString(),
        message: formData.message
      })
    }

    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center">
          <div className="rounded-2xl bg-white p-8 shadow-2xl border border-gray-100">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
              <CheckCircleIcon className="h-14 w-14 text-green-600" aria-hidden="true" />
            </div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
              Thank You for Your Donation!
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Your generosity helps us continue our mission of caring for animals in need.
            </p>
            <div className="mt-8">
              <div className="rounded-lg bg-gray-50 px-6 py-5">
                <div className="text-sm">
                  <p className="font-medium text-gray-500">Donation Amount</p>
                  <p className="mt-1 font-semibold text-gray-900">LKR {formData.amount}</p>
                </div>
                <div className="mt-4 text-sm">
                  <p className="font-medium text-gray-500">Purpose</p>
                  <p className="mt-1 font-semibold text-gray-900">
                    {DONATION_PURPOSES.find(p => p.id === formData.purpose)?.label}
                  </p>
                </div>
              </div>
              
              <button
                onClick={handleDownloadReceipt}
                className="mt-6 inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <DocumentArrowDownIcon className="h-5 w-5" />
                Download Receipt
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center">
          <HeartIcon className="mx-auto h-16 w-16 text-primary-600" />
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900">
            Make a Donation
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Your donation helps us provide food, shelter, and medical care to animals in need.
            Every contribution makes a difference.
          </p>
        </div>

        {/* Donation Form */}
        <form onSubmit={handleSubmit} className="mt-12 space-y-8">
          {/* Donation Amount */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-8 py-6">
              <h2 className="text-2xl font-semibold text-gray-900">Donation Amount</h2>
              <p className="mt-1 text-sm text-gray-600">How much would you like to donate?</p>
              
              <div className="mt-6">
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <CurrencyDollarIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    min="0"
                    required
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="block w-full rounded-lg border-0 py-3 pl-11 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
                    placeholder="Enter amount in LKR"
                  />
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {[1000, 2000, 5000, 10000].map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => setFormData({ ...formData, amount: amount.toString() })}
                      className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      LKR {amount.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Donation Purpose */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-8 py-6">
              <h2 className="text-2xl font-semibold text-gray-900">Donation Purpose</h2>
              <p className="mt-1 text-sm text-gray-600">Select where you'd like your donation to go</p>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {DONATION_PURPOSES.map((purpose) => (
                  <div
                    key={purpose.id}
                    className={`relative rounded-lg border p-4 cursor-pointer transition-all ${
                      formData.purpose === purpose.id
                        ? 'border-primary-600 ring-2 ring-primary-600'
                        : 'border-gray-300 hover:border-primary-600'
                    }`}
                    onClick={() => setFormData({ ...formData, purpose: purpose.id })}
                  >
                    <label className="font-medium text-gray-900 cursor-pointer">
                      <input
                        type="radio"
                        className="sr-only"
                        name="purpose"
                        value={purpose.id}
                        checked={formData.purpose === purpose.id}
                        onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                        required
                      />
                      {purpose.label}
                    </label>
                    <p className="mt-1 text-sm text-gray-500">{purpose.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-8 py-6">
              <h2 className="text-2xl font-semibold text-gray-900">Your Information</h2>
              <p className="mt-1 text-sm text-gray-600">Let us know who you are</p>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    placeholder="your@email.com"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Message (Optional)</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows="3"
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    placeholder="Share why you're making this donation..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-center pt-6">
            <button
              type="submit"
              className="w-full md:w-auto px-8 py-4 text-lg font-medium text-white bg-primary-600 rounded-xl hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all transform hover:scale-[1.02]"
            >
              Complete Donation
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}