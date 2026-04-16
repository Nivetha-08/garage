import { FiLogOut } from "react-icons/fi"
import { useClerk } from "@clerk/clerk-react"

interface Props {
  collapsed?: boolean
}

const LogoutButton = ({ collapsed = false }: Props) => {
  const { signOut } = useClerk()

  return (
    <button
      onClick={() => signOut()}
      title="Logout"
      className={`btn btn-outline-danger d-flex align-items-center ${
        collapsed
          ? "justify-content-center px-2 py-2"
          : "w-100 gap-2 px-3"
      }`}
      style={{
        minWidth: collapsed ? "44px" : undefined,
      }}
    >
      <FiLogOut size={18} />
      {!collapsed && <span>Logout</span>}
    </button>
  )
}

export default LogoutButton

