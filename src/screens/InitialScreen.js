import React, { useEffect } from 'react'
import { gql, useQuery } from '@apollo/client'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useAuth } from '../contexts/AuthContext'
import BottomTabs from '../components/navigations/BottomTabs'
import AuthStack from '../components/navigations/AuthStack'
import SplashScreen from './SplashScreen'

const InitialScreen = () => {
  const { isLoggedIn, setIsLoggedIn, setToken, setUser } = useAuth()

  const { data, loading } = useQuery(gql`
    query {
      whoami {
        id
        username
        role
        image
      }
    }
  `)

  useEffect(() => {
    AsyncStorage.getItem('token').then(token => {
      if (token) {
        setToken(token)
        setIsLoggedIn(true)
      }
    })
  }, [setToken, setIsLoggedIn])

  useEffect(() => {
    if (!loading && data) setUser(data.whoami)
  }, [loading, data, setUser])

  if (loading) return <SplashScreen />

  return isLoggedIn ? <BottomTabs /> : <AuthStack />
}

export default InitialScreen
