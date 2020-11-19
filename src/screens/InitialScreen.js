import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import BottomNavigation from '../components/BottomNavigation'
import LoginScreen from './LoginScreen'

const InitialScreen = () => {
  const { isLoggedIn } = useAuth()

  return isLoggedIn ? <BottomNavigation /> : <LoginScreen />
}

export default InitialScreen
