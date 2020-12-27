import React, { createContext, useContext, useState } from 'react'
import { Alert } from 'react-native'
import { gql, useMutation } from '@apollo/client'
import AsyncStorage from '@react-native-async-storage/async-storage'

const LOGIN_MUTATION = gql`
  mutation LoginUser($credentials: AuthInput!) {
    login(input: $credentials) {
      token
      user {
        id
        username
        role
        image
        profile {
          firstName
          middleName
          lastName
        }
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
    image: null,
    profile: {
      firstName: null,
      middleName: null,
      lastName: null,
    },
  },
  isLoggedIn: false,
}

const AuthContext = createContext(initialState)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(initialState)
  const [loginLoading, setLoginLoading] = useState(false)

  const [loginUser] = useMutation(LOGIN_MUTATION, {
    onCompleted: async ({ login: { token, user } }) => {
      const auth = { token, user, isLoggedIn: true }
      await AsyncStorage.setItem('auth', JSON.stringify(auth))
      setAuth(auth)
      setLoginLoading(false)
    },
    onError: err => {
      Alert.alert(err.name, err.message)
      setLoginLoading(false)
    },
  })

  const login = (username, password) => {
    setLoginLoading(true)
    loginUser({ variables: { credentials: { username, password } } })
  }

  const logout = async () => {
    await AsyncStorage.removeItem('auth')
    setAuth(initialState)
  }

  return (
    <AuthContext.Provider
      value={{
        ...auth,
        setAuth,
        login,
        loginLoading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
