import { ReactNode } from "react"

// Layout for any menu
export default function Sidebar({ children }: { children: ReactNode}) {
  return (
    <div className="h-full border-r overflow-auto">
      {children}
    </div>
  )
}
