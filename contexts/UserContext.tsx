// useSession of next-auth already provides the user hook to use anywhere in the app

import { createContext, useContext, useState } from 'react'
import { useSession } from "next-auth/react"

// AuthContext //UserContext //AccountContext
export const UserContext: any = createContext(null)

export function useUser() {
  return useContext(UserContext)
}

export function UserProvider({ children }: any) {
  const [user, setUser] = useState(null)

  let sessionUser: any = useSession()
  if (sessionUser === undefined) throw new Error("useUser must be used within a UserProvider")
  // setUser(sessionUser)

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}
