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
  isLoggedIn: false,
}

const AuthContext = createContext(initialState)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(initialState.token)
  const [user, setUser] = useState(initialState.user)
  const [isLoggedIn, setIsLoggedIn] = useState(initialState.isLoggedIn)

  const login = ({ token, user }) => {
    AsyncStorage.setItem('token', token).then(() => {
      setToken(token)
    })
    AsyncStorage.setItem('user', JSON.stringify(user)).then(() => {
      setUser(user)
      setIsLoggedIn(true)
    })
  }

  const logout = () => {
    AsyncStorage.removeItem('token').then(() => {
      setToken(initialState.token)
    })
    AsyncStorage.removeItem('user').then(() => {
      setUser(initialState.user)
      setIsLoggedIn(initialState.isLoggedIn)
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
