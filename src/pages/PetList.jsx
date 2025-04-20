import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MagnifyingGlassIcon, ChevronDownIcon, HeartIcon } from '@heroicons/react/24/outline'

export default function PetList() {
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState({
    type: '',
    gender: '',
    ageRange: ''
  })

  const pets = [
    { 
      id: 1, 
      name: 'Max', 
      type: 'Dog', 
      breed: 'Golden Retriever',
      age: 2, 
      gender: 'Male',
      description: 'Friendly and energetic Golden Retriever who loves to play fetch and go for long walks.',
      image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' 
    },
    { 
      id: 2, 
      name: 'Luna', 
      type: 'Cat', 
      breed: 'Persian',
      age: 1, 
      gender: 'Female',
      description: 'Sweet and gentle Persian cat who enjoys lounging in sunny spots and gentle pets.',
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' 
    },
    { 
      id: 3, 
      name: 'Rocky', 
      type: 'Dog', 
      breed: 'German Shepherd',
      age: 3, 
      gender: 'Male',
      description: 'Intelligent and loyal German Shepherd, great with families and excellent at learning new tricks.',
      image: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' 
    },
    { 
      id: 4, 
      name: 'Milo', 
      type: 'Cat', 
      breed: 'Siamese',
      age: 2, 
      gender: 'Male',
      description: 'Playful Siamese cat with striking blue eyes, very social and loves attention.',
      image: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' 
    }
  ]

  const filteredPets = pets.filter(pet => {
    const matchesSearch = 
      pet.name.toLowerCase().includes(search.toLowerCase()) ||
      pet.breed.toLowerCase().includes(search.toLowerCase())
    const matchesType = !filters.type || pet.type === filters.type
    const matchesGender = !filters.gender || pet.gender === filters.gender
    const matchesAge = !filters.ageRange || (
      filters.ageRange === '0-2' ? pet.age <= 2 :
      filters.ageRange === '3-5' ? pet.age >= 3 && pet.age <= 5 :
      filters.ageRange === '6+' ? pet.age >= 6 : true
    )
    return matchesSearch && matchesType && matchesGender && matchesAge
  })

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Find Your Perfect Companion
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Browse our available pets and find your new best friend. Each of our pets is special and ready to find their forever home.
        </p>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search pets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="block w-full rounded-lg border-0 py-2.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
            />
          </div>

          <div className="relative">
            <select
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              className="block w-full rounded-lg border-0 py-2.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
            >
              <option value="">All Types</option>
              <option value="Dog">Dogs</option>
              <option value="Cat">Cats</option>
            </select>
            <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          </div>

          <div className="relative">
            <select
              value={filters.gender}
              onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
              className="block w-full rounded-lg border-0 py-2.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
            >
              <option value="">All Genders</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          </div>

          <div className="relative">
            <select
              value={filters.ageRange}
              onChange={(e) => setFilters({ ...filters, ageRange: e.target.value })}
              className="block w-full rounded-lg border-0 py-2.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
            >
              <option value="">All Ages</option>
              <option value="0-2">0-2 years</option>
              <option value="3-5">3-5 years</option>
              <option value="6+">6+ years</option>
            </select>
            <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Pets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPets.map(pet => (
          <div key={pet.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden group">
            <div className="relative">
              <img 
                src={pet.image} 
                alt={pet.name} 
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <button className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors">
                <HeartIcon className="w-5 h-5 text-gray-600 hover:text-red-500 transition-colors" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xl font-semibold text-gray-900">{pet.name}</h2>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-50 text-primary-700">
                    {pet.type}
                  </span>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-gray-900">{pet.breed}</span> • {pet.age} years • {pet.gender}
                </p>
                <p className="text-sm text-gray-600 line-clamp-2">{pet.description}</p>
              </div>

              <Link 
                to="/adopt" 
                className="block w-full text-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
              >
                Adopt Me
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredPets.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">No pets found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}