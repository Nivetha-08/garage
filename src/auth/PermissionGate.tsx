import { useSelector } from 'react-redux'
import { type RootState } from '../app/store'
import type { ReactNode } from 'react'

export const PermissionGate = ({
  permission,     
  children
}: {
  permission: string
  children: ReactNode
}) => {
  const permissions = useSelector(
    (s: RootState) => s.auth.user?.permissions || []
  )

  return permissions.includes(permission) ? children : null
}


