import { useEffect } from 'react'
import { useUser } from '@clerk/clerk-react'
import { useDispatch } from 'react-redux'
import { createUserThunk, fetchAuthUserThunk } from '../features/auth/authThunks'
import { type AppDispatch } from '../app/store'

export default function AfterAuth() {
  const { user: clerkUser, isLoaded: isCheckComplete } = useUser()  

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    
    if (!isCheckComplete || !clerkUser) return

    const syncUser = async () => {
      try {
          const dbUser = await dispatch(
            fetchAuthUserThunk(clerkUser.id)
          ).unwrap()   

          if (!dbUser) {
            await dispatch(
              createUserThunk({
                clerkUserId: clerkUser.id as string,
                email: clerkUser.primaryEmailAddress?.emailAddress as string,
              })
            ).unwrap()
          }
      } catch (error) {
          console.log(error);
      }
    }

    if(isCheckComplete && clerkUser.id) {
      syncUser()
    }
    // eslint-disable-next-line
  }, [isCheckComplete, clerkUser]) 
  return <p>Setting up your account...</p>
}