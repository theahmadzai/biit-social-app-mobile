import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useAuth } from '../contexts/AuthContext'
import BottomTabs from '../components/navigations/BottomTabs'
import AuthStack from '../components/navigations/AuthStack'
import SplashScreen from './SplashScreen'

const InitialScreen = () => {
  const [loading, setLoading] = useState(true)
  const { isLoggedIn, setIsLoggedIn, setToken, setUser } = useAuth()

  useEffect(() => {
    AsyncStorage.getItem('token')
      .then(token => {
        if (token) {
          setToken(token)
          AsyncStorage.getItem('user').then(user => {
            if (user) {
              setUser(JSON.parse(user))
              setIsLoggedIn(true)
            }
          })
        }
      })
      .then(() => setLoading(false))
  }, [setToken, setUser, setIsLoggedIn])

  if (loading) return <SplashScreen />

  return isLoggedIn ? <BottomTabs /> : <AuthStack />
}

export default InitialScreen
