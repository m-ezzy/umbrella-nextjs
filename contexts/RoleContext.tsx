"use client"

import { PropsWithChildren, createContext, useContext, useState } from "react"

export const RoleContext: any = createContext(null)

export function useRole() {
  // return useContext(RoleContext)

  const role = useContext(RoleContext)
  if (role === undefined) throw new Error("useRole must be used within a RoleProvider")
  return role
}
export function RoleProvider({ children }: any) {
  const [role, setRole] = useState(null)
  
  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  )
}
