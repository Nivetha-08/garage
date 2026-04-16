import { SignIn } from '@clerk/clerk-react'

// eslint-disable-next-line react-refresh/only-export-components
export default () => (
  <SignIn
    signUpUrl='/sign-up'
    afterSignInUrl="/after-auth"    
    redirectUrl="/after-auth"      
  />
)
