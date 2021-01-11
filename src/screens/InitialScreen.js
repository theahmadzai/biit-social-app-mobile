import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useAuth } from '../contexts/AuthContext'
import BottomTabs from '../components/navigations/BottomTabs'
import LoginScreen from './LoginScreen'
import SplashScreen from './SplashScreen'

const InitialScreen = () => {
  const [loading, setLoading] = useState(true)
  const { isLoggedIn, setAuth } = useAuth()

  useEffect(() => {
    AsyncStorage.getItem('auth')
      .then(state => {
        if (state) setAuth(JSON.parse(state))
      })
      .then(() => setLoading(false))
    return () => setAuth({})
  }, [setAuth])

  if (loading) return <SplashScreen />

  return isLoggedIn ? <BottomTabs /> : <LoginScreen />
}

export default InitialScreen
