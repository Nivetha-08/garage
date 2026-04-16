import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import type { RootState } from '../app/store'

type RoleRouteProps = {
  roles: string[]
}

export const RoleRoute = ({ roles }: RoleRouteProps) => {
  const { user, loading } = useSelector((s: RootState) => s.auth)
  
  if (loading) return <p>Checking permissions...</p>

  if (!user || !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />
  }

  return <Outlet />
}
