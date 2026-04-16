import { createAsyncThunk } from '@reduxjs/toolkit'
import { createUser, getUserByClerkId } from './authApi'

export const fetchAuthUserThunk = createAsyncThunk(
  'auth/fetchAuthUser',
  async (clerkUserId: string, { signal }) => {
    const data = await getUserByClerkId(clerkUserId, signal)
    return data[0] || null  
  }
)

export const createUserThunk = createAsyncThunk(
  'auth/createUser',
  async (data: { clerkUserId: string, email: string }) => {
   
    const newUser = await createUser(data)  
    return newUser
  }
)
