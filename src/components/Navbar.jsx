import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-primary-600">
            Pet Adoption
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/pets" className="text-gray-600 hover:text-primary-600">
              Available Pets
            </Link>
            <Link to="/adopt" className="text-gray-600 hover:text-primary-600">
              Adopt
            </Link>
            <Link to="/donate" className="text-gray-600 hover:text-primary-600">
              Donate
            </Link>
            <Link to="/admin" className="text-gray-600 hover:text-primary-600">
              Admin
            </Link>
            <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-gray-200">
              <Link to="/login" className="text-gray-600 hover:text-primary-600">
                Login
              </Link>
              <Link to="/signup" className="btn-primary">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}