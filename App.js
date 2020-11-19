import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { AuthProvider } from './src/contexts/AuthContext'
import InitialScreen from './src/screens/InitialScreen'

const client = new ApolloClient({
  uri: 'http://biit-social-app-api.herokuapp.com/graphql',
  cache: new InMemoryCache(),
})

const App = () => {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <StatusBar style="auto" />
        <InitialScreen />
      </AuthProvider>
    </ApolloProvider>
  )
}

export default App
