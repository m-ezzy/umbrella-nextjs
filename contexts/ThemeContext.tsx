'use client'

import { createContext, useContext, useState } from 'react'

export const ThemeContext: any = createContext<{
  theme: string;
  setTheme: (theme: string) => void
} | null>(null)

export function useTheme() {
  return useContext(ThemeContext)
}
export function ThemeProvider({ children }: any) {
  const [theme, setTheme]: [
    string,
    (theme: string) => void
  ] = useState<string>("light")
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
