import { useUser } from '@clerk/clerk-react'
import { Navigate, Outlet } from 'react-router-dom'

export const ProtectedRoute = () => {
  const { isSignedIn } = useUser()
  return isSignedIn ? <Outlet /> : <Navigate to="/sign-in" />
}
