import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import BottomTabNavigator from '../components/BottomTabNavigator'
import LoginScreen from './LoginScreen'
import Loading from '../components/Loading'

const InitialScreen = () => {
  const { isLoggedIn, loginLoading } = useAuth()

  if (loginLoading) return <Loading />

  return isLoggedIn ? <BottomTabNavigator /> : <LoginScreen />
}

export default InitialScreen
