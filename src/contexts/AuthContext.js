import React, { createContext, useContext, useEffect, useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import AsyncStorage from '@react-native-async-storage/async-storage'

const USER_FRAGMENT = gql`
  fragment UserFields on User {
    username
    firstName
    middleName
    lastName
    email
  }
`

const LOGIN_USER = gql`
  mutation LoginUser($credentials: AuthInput!) {
    login(input: $credentials) {
      token
      user {
        ...UserFields
      }
    }
  }

  ${USER_FRAGMENT}
`

const initialState = {
  token: null,
  user: {
    username: null,
    firstName: null,
    middleName: null,
    lastName: null,
    email: null,
  },
}

const AuthContext = createContext(initialState)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(initialState.user)

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
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
      value={{ token, user, isLoggedIn, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
