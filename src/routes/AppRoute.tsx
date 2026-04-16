import { Routes, Route } from 'react-router-dom'
import SignIn from '../auth/SignIn'
import SignUp from '../auth/SignUp'
import AfterAuth from '../auth/AfterAuth'
import Unauthorized from '../pages/public/Unauthorized'
import HomePage from '../pages/public/HomePage'
import { ProtectedRoute } from '../auth/ProtectedRoute'
import { RoleRoute } from '../auth/RoleRoute'
import PostLoginRedirect from '../auth/PostLoginRedirect'
import DashboardLayout from '../layout/DashboardLayout'
import Users from '../features/PageSection/Users/Users'
import Services from '../features/PageSection/Services/Services'
import SpareParts from '../features/PageSection/SpareParts/SpareParts'
import Customers from '../features/PageSection/Customers/Customers'
import Vehicles from '../features/PageSection/Vehicles/Vehicles'
import Invoies from '../features/PageSection/Invoices/Invoies'
import DashBoard from '../features/PageSection/Dashboard/Dashboard'
import JobCards from '../features/PageSection/JobCards/JobCards'

export default function AppRoute() {

  return (
    <>
       <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/after-auth" element={
          <>
            <AfterAuth />
            <PostLoginRedirect />
          </>
        } />
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route element={<ProtectedRoute />}>

          <Route element={<DashboardLayout />}>

            <Route element={<RoleRoute roles={['admin']} />}>
              <Route path="user" element={<Users />} />
            </Route>

            <Route element={<RoleRoute roles={['admin','manager']} />}>
              <Route path="services" element={<Services />} />
              <Route path="spareParts" element={<SpareParts />} />
            </Route>

             <Route element={<RoleRoute roles={['admin','manager', 'receptionist']} />}>
              <Route path="customers" element={<Customers />} />
              <Route path="vehicles" element={<Vehicles />} />
              <Route path="invoices" element={<Invoies />} />
            </Route>

            <Route element={<RoleRoute roles={['admin','manager', 'receptionist', 'mechanic']} />}>
              <Route path="dashboard" element={<DashBoard />} />
              <Route path="jobCards" element={<JobCards />} />
            </Route>

          </Route>
        </Route>

      </Routes>
    </>
  )
}
