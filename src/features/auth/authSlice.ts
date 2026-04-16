import { createSlice } from '@reduxjs/toolkit'
import { createUserThunk, fetchAuthUserThunk } from './authThunks'

type AuthState = {
  user: null | {
    id:number,
    name:string
    role: string
    permissions: string[]
  }
  loading: boolean
}

const initialState: AuthState = {
  user: null,
  loading: false
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthUserThunk.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchAuthUserThunk.fulfilled, (state, action) => {
        state.user = action.payload
        state.loading = false
      })
      .addCase(createUserThunk.pending, (state) => {
        state.loading = true
      })
      .addCase(createUserThunk.fulfilled, (state, action) => {
        state.user = action.payload 
        state.loading = false
      })
  }
})

export const { logout } = authSlice.actions
export default authSlice.reducer
