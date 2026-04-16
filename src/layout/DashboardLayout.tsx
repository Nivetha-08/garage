import React, { useEffect, useRef, useState } from "react"
import { NavLink, Outlet } from "react-router-dom"
import * as bootstrap from "bootstrap"
import { useSelector } from "react-redux"
import type { RootState } from "../app/store"
import { UserButton } from "@clerk/clerk-react"
import LogoutButton from "../pages/private/LogoutButton"

import { IoHome } from "react-icons/io5"
import { FaPeopleGroup, FaPeopleArrows, FaPeopleCarryBox } from "react-icons/fa6"
import { BsBorderStyle } from "react-icons/bs"
import { RiUserSettingsFill } from "react-icons/ri"

const SIDEBAR_WIDTH = 240
const SIDEBAR_COLLAPSED_WIDTH = 72

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const mobileSidebarRef = useRef<HTMLDivElement | null>(null)
  const user = useSelector((s: RootState) => s.auth.user)

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth

      if (width < 768) {
        setIsMobile(true)
        setCollapsed(true)
      } else {
        setIsMobile(false)
        setCollapsed(width < 992)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  if (!user) return null

  const menuItems = [
    { label: "Dashboard", path: "/dashboard", icon: <IoHome />, roles: ["admin", "manager", "receptionist", "mechanic"] },
    { label: "Customers", path: "/customers", icon: <FaPeopleGroup />, roles: ["admin", "manager", "receptionist"] },
    { label: "Vehicles", path: "/vehicles", icon: <FaPeopleArrows />, roles: ["admin", "manager", "receptionist"] },
    { label: "JobCards", path: "/jobCards", icon: <BsBorderStyle />, roles: ["admin", "manager", "receptionist", "mechanic"] },
    { label: "Services", path: "/services", icon: <FaPeopleCarryBox />, roles: ["admin", "manager"] },
    { label: "SpareParts", path: "/spareParts", icon: <RiUserSettingsFill />, roles: ["admin", "manager"] },
    { label: "Invoices", path: "/invoices", icon: <BsBorderStyle />, roles: ["admin", "manager", "receptionist"] },
    { label: "Users", path: "/user", icon: <FaPeopleGroup />, roles: ["admin"] },
  ]

  const closeMobileSidebar = () => {
    const instance = bootstrap.Offcanvas.getInstance(mobileSidebarRef.current!)
    instance?.hide()
  }

  return (
    <div className="d-flex min-vh-100">

      {/* DESKTOP SIDEBAR */}
      {!isMobile && (
        <aside
          className="border-end bg-white d-flex flex-column"
          style={{
            width: collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH,
            transition: "width 0.25s ease",
          }}
        >
          <div className="d-flex align-items-center justify-content-between p-3">
            {!collapsed && <h6 className="fw-bold text-primary mb-0">Garage</h6>}
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? "➡" : "⬅"}
            </button>
          </div>

          <ul className="nav nav-pills flex-column gap-2 px-2 flex-grow-1">
            {menuItems
              .filter(item => item.roles.includes(user.role))
              .map(item => (
                <li key={item.label}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `nav-link d-flex align-items-center gap-3 py-2 rounded ${
                        isActive ? "bg-primary text-white" : "text-dark"
                      }`
                    }
                  >
                    <span className="fs-5">{item.icon}</span>
                    {!collapsed && <span>{item.label}</span>}
                  </NavLink>
                </li>
              ))}
          </ul>

          <div className="border-top p-3">
            <LogoutButton collapsed={collapsed} />
          </div>
        </aside>
      )}

      {/* MAIN CONTENT */}
      <div className="flex-grow-1 d-flex flex-column">

        <nav className="navbar bg-white border-bottom px-3 d-flex justify-content-between">
          {isMobile && (
            <button
              className="btn btn-outline-secondary"
              data-bs-toggle="offcanvas"
              data-bs-target="#mobileSidebar"
            >
              ☰
            </button>
          )}

          <span className="fw-bold text-primary">Garage Management System Dashboard</span>
          <UserButton />
        </nav>

        <div className="p-3 p-md-4 bg-light flex-grow-1">
          <Outlet />
        </div>
      </div>

      {/* MOBILE SIDEBAR */}
      <div
        ref={mobileSidebarRef}
        className="offcanvas offcanvas-start"
        id="mobileSidebar"
      >
        <div className="offcanvas-header">
          <h5 className="text-primary">Garage</h5>
          <button className="btn-close" data-bs-dismiss="offcanvas" />
        </div>

        <div className="offcanvas-body d-flex flex-column">
          <ul className="nav flex-column gap-2 flex-grow-1">
            {menuItems
              .filter(item => item.roles.includes(user.role))
              .map(item => (
                <li key={item.label}>
                  <NavLink
                    to={item.path}
                    onClick={closeMobileSidebar}
                    className="nav-link d-flex gap-3 py-2 text-dark"
                  >
                    <span className="fs-5">{item.icon}</span>
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              ))}
          </ul>

          <LogoutButton />
        </div>
      </div>
    </div>
  )
}

export default React.memo(DashboardLayout)
