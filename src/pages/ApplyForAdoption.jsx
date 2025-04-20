import { useState } from 'react'
import { CheckCircleIcon } from '@heroicons/react/24/outline'

export default function ApplyForAdoption() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    housingType: '',
    hasYard: '',
    otherPets: '',
    experience: '',
    reason: ''
  })

  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <div className="rounded-2xl bg-white p-12 shadow-2xl border border-gray-100">
          <div className="mx-auto w-24 h-24 bg-primary-50 rounded-full flex items-center justify-center mb-8">
            <CheckCircleIcon className="h-16 w-16 text-primary-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Application Submitted!</h2>
          <p className="text-lg text-gray-600 mb-8">
            Thank you for your interest in adoption. We'll review your application and contact you soon.
          </p>
          <div className="w-32 h-1 bg-primary-100 mx-auto"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Apply for Adoption</h1>
        <div className="w-24 h-1 bg-primary-500 mx-auto mb-6"></div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Begin your journey of giving a loving home to a pet in need
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100">
        <div className="p-8 lg:p-12 space-y-10">
          {/* Personal Information */}
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-10 w-10 rounded-full bg-primary-50 flex items-center justify-center">
                <span className="text-xl font-semibold text-primary-600">1</span>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">Personal Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 transition-colors"
                  placeholder="Enter your first name"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 transition-colors"
                  placeholder="Enter your last name"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 transition-colors"
                  placeholder="Enter your email address"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 transition-colors"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-10 w-10 rounded-full bg-primary-50 flex items-center justify-center">
                <span className="text-xl font-semibold text-primary-600">2</span>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">Address</h2>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Street Address</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 transition-colors"
                  placeholder="Enter your street address"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">City</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 transition-colors"
                    placeholder="Enter city"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">State</label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 transition-colors"
                    placeholder="Enter state"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">ZIP Code</label>
                  <input
                    type="text"
                    required
                    value={formData.zipCode}
                    onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 transition-colors"
                    placeholder="Enter ZIP code"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Living Situation */}
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-10 w-10 rounded-full bg-primary-50 flex items-center justify-center">
                <span className="text-xl font-semibold text-primary-600">3</span>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">Living Situation</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Housing Type</label>
                <select
                  required
                  value={formData.housingType}
                  onChange={(e) => setFormData({ ...formData, housingType: e.target.value })}
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 transition-colors"
                >
                  <option value="">Select housing type</option>
                  <option value="house">House</option>
                  <option value="apartment">Apartment</option>
                  <option value="condo">Condo</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Do you have a yard?</label>
                <select
                  required
                  value={formData.hasYard}
                  onChange={(e) => setFormData({ ...formData, hasYard: e.target.value })}
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 transition-colors"
                >
                  <option value="">Select an option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
            </div>
          </div>

          {/* Pet Experience */}
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-10 w-10 rounded-full bg-primary-50 flex items-center justify-center">
                <span className="text-xl font-semibold text-primary-600">4</span>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">Pet Experience</h2>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Do you have other pets?</label>
                <select
                  required
                  value={formData.otherPets}
                  onChange={(e) => setFormData({ ...formData, otherPets: e.target.value })}
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 transition-colors"
                >
                  <option value="">Select an option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Previous Pet Experience</label>
                <textarea
                  required
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  rows="3"
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 transition-colors"
                  placeholder="Tell us about your experience with pets..."
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Why do you want to adopt?</label>
                <textarea
                  required
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  rows="4"
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 transition-colors"
                  placeholder="Share your reasons for wanting to adopt..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="px-8 lg:px-12 py-6 bg-gray-50 border-t border-gray-100">
          <button
            type="submit"
            className="w-full px-8 py-4 text-lg font-medium text-white bg-primary-600 rounded-xl hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all transform hover:scale-[1.02]"
          >
            Submit Application
          </button>
          <p className="mt-4 text-sm text-center text-gray-500">
            By submitting this form, you agree to our adoption process and home visit requirements.
          </p>
        </div>
      </form>
    </div>
  )
}