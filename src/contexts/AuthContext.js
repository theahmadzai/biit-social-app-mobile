import React, { createContext, useContext, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const initialState = {
  token: null,
  user: {
    id: null,
    username: null,
    role: null,
    image: null,
  },
}

const AuthContext = createContext(initialState)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(initialState.user)

  const login = ({ token, user }) => {
    AsyncStorage.setItem('token', token).then(() => {
      setToken(token)
      setIsLoggedIn(true)
      setUser(user)
    })
  }

  const logout = () => {
    AsyncStorage.removeItem('token').then(() => {
      setIsLoggedIn(false)
    })
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
