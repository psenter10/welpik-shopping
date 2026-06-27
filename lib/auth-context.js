'use client'
import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem('zh_user')
      if (raw) setUser(JSON.parse(raw))
    } catch (e) {}
    setHydrated(true)
  }, [])

  const login = (info) => {
    const u = { ...info, loginAt: new Date().toISOString() }
    setUser(u)
    try { localStorage.setItem('zh_user', JSON.stringify(u)) } catch (e) {}
  }

  const logout = () => {
    setUser(null)
    try { localStorage.removeItem('zh_user') } catch (e) {}
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, hydrated }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
