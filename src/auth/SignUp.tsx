import { SignUp } from '@clerk/clerk-react'

// eslint-disable-next-line react-refresh/only-export-components
export default () => (
  <SignUp
    signInUrl="/sign-in"
    redirectUrl="/after-auth"
  />
)
