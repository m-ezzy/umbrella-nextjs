"use client"
// import { createContext, PropsWithChildren, useContext, useState } from "react"
import { PropsWithChildren, createContext, useState } from "react"

export const RoleContext = createContext(null)

// export function useRole() {
//   return useContext(RoleContext)

//   const role = useContext(RoleContext)

//   if (role === undefined) {
//     throw new Error("useRole must be used within a RoleProvider")
//   }
//   return role
// }

export function RoleProvider({ children }: PropsWithChildren<any>) {
  const [role, setRole] = useState("student")

  return (
    <RoleContext.Provider value={ role, setRole }>
      {children}
    </RoleContext.Provider>
  )
}
