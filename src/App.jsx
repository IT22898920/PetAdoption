import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import AdminLayout from './layouts/AdminLayout'
import Home from './pages/Home'
import PetList from './pages/PetList'
import ApplyForAdoption from './pages/ApplyForAdoption'
import AdminDashboard from './pages/AdminDashboard'
import ManagePets from './pages/admin/ManagePets'
import Applications from './pages/admin/Applications'
import Donations from './pages/admin/Donations'
import PetForm from './pages/PetForm'
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import Signup from './pages/Signup'
import DonationPage from './pages/DonationPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="pets" element={<PetList />} />
        <Route path="adopt" element={<ApplyForAdoption />} />
        <Route path="donate" element={<DonationPage />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>
      
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="pets" element={<ManagePets />} />
        <Route path="applications" element={<Applications />} />
        <Route path="donations" element={<Donations />} />
        <Route path="pet/:id?" element={<PetForm />} />
      </Route>
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App