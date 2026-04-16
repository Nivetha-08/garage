import type { RootState } from "../app/store"
import { useSelector } from "react-redux"

const RoleGuard = ({roles}: {roles: string[]}) => {

    const { user } = useSelector((state: RootState)=> state.auth)
    const currentUserRole: string = user?.role ?? ''

  return (user || roles.includes(currentUserRole)) ? true : false
}

export default RoleGuard