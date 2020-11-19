import React, { createContext, useContext } from 'react'
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
}

const AuthContext = createContext(initialState)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [login, { loading }] = useMutation(LOGIN_USER, {
    onCompleted: async ({ login }) => {
      await AsyncStorage.setItem('token', login.token)
    },
  })

  const loginUser = (username, password) => {
    login({ variables: { credentials: { username, password } } })
  }

  return (
    <AuthContext.Provider value={{ login: loginUser, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
