const BASE_URL = 'http://localhost:3001'

export const getUserByClerkId = async (clerkUserId: string, signal?: AbortSignal) => {
  const res = await fetch(`${BASE_URL}/users?clerkUserId=${clerkUserId}`, { signal })
  const data = await res.json()
  return data
}

export const createUser = async (data: {
  clerkUserId: string
  email: string
}) => {
  
  const res = await fetch(`${BASE_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...data,
      role: 'user',
      permissions: ['user:read']
    })
  })
  const resData = await res.json()
  return resData 
}

export const updateUserRole = async (
  id: number,
  role: 'admin' | 'sub-admin' | 'user',
  permissions: string[]
) => {
  return fetch(`http://localhost:3001/users/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ role, permissions })
  })
}
