import React, { createContext, useContext, useEffect, useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import AsyncStorage from '@react-native-async-storage/async-storage'

const LOGIN_USER = gql`
  mutation LoginUser($credentials: AuthInput!) {
    login(input: $credentials) {
      token
      user {
        id
        name
        email
      }
    }
  }
`

const initialState = {
  token: null,
  user: null,
}

const AuthContext = createContext(initialState)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [token, setToken] = useState(null)
  const [user, setUser] = useState({
    id: null,
    name: null,
    email: null,
  })

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    onCompleted: async ({ login }) => {
      await AsyncStorage.setItem('token', login.token)
      setToken(login.token)
      setIsLoggedIn(true)
      setUser(login.user)
    },
  })

  useEffect(() => {
    AsyncStorage.getItem('token').then(token => {
      if (token) setIsLoggedIn(true)
    })
  }, [])

  const login = (username, password) => {
    loginUser({ variables: { credentials: { username, password } } })
  }

  const logout = async () => {
    await AsyncStorage.removeItem('token')
    setIsLoggedIn(false)
  }

  const auth = { token, user, isLoggedIn, login, logout, loading }

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export default AuthContext
