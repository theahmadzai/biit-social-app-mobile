import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import AsyncStorage from '@react-native-async-storage/async-storage'
import BottomNavigation from './src/components/BottomNavigation'
import SignInScreen from './src/screens/SignInScreen'
import Loading from './src/components/Loading'

const client = new ApolloClient({
  uri: 'http://biit-social-app-api.herokuapp.com/graphql',
  cache: new InMemoryCache(),
})

const App = (): JSX.Element => {
  const [loading, setLoading] = useState(true)
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    AsyncStorage.getItem('token').then(token => {
      setLoading(false)
      if (token) setLoggedIn(true)
    })
  })

  if (loading) return <Loading />

  return (
    <ApolloProvider client={client}>
      <StatusBar style="auto" />
      {loggedIn ? <BottomNavigation /> : <SignInScreen />}
    </ApolloProvider>
  )
}

export default App
