import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { type RootState } from '../app/store'

export default function PostLoginRedirect() {
  const { user, loading } = useSelector((s: RootState) => s.auth)
  const navigate = useNavigate()

  useEffect(() => {
    
    if (loading || !user?.role) return

    if (user.role === 'admin' ||user.role === 'manager' ||user.role === 'receptionist' ||user.role === 'mechanic')
       {
        navigate('/dashboard', { replace: true })
       }
  }, [loading, user?.role, navigate])

  return null
}

