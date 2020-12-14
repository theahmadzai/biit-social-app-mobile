import React, { createContext, useContext, useEffect, useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import AsyncStorage from '@react-native-async-storage/async-storage'

const LOGIN_USER = gql`
  mutation LoginUser($credentials: AuthInput!) {
    login(input: $credentials) {
      token
      user {
        id
        username
        role
      }
    }
  }
`

const initialState = {
  token: null,
  user: {
    id: null,
    username: null,
    role: null,
  },
}

const AuthContext = createContext(initialState)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(initialState.user)

  const [loginUser, { loading: loginLoading }] = useMutation(LOGIN_USER, {
    onCompleted: ({ login }) => {
      AsyncStorage.setItem('token', login.token).then(() => {
        setToken(login.token)
        setIsLoggedIn(true)
        setUser(login.user)
      })
    },
  })

  useEffect(() => {
    AsyncStorage.getItem('token').then(token => {
      if (token) {
        setToken(token)
        setIsLoggedIn(true)
      }
    })
  }, [])

  const login = (username, password) => {
    loginUser({ variables: { credentials: { username, password } } })
  }

  const logout = () => {
    AsyncStorage.removeItem('token').then(() => {
      setIsLoggedIn(false)
    })
  }

  return (
    <AuthContext.Provider
      value={{ token, user, isLoggedIn, login, logout, loginLoading }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
