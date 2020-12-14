import React from 'react'
import { StatusBar } from 'expo-status-bar'
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Provider as PaperProvider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { AuthProvider } from './src/contexts/AuthContext'
import InitialScreen from './src/screens/InitialScreen'

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql',
})

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem('token')

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

const App = () => {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <PaperProvider>
          <NavigationContainer>
            <StatusBar style="auto" />
            <InitialScreen />
          </NavigationContainer>
        </PaperProvider>
      </AuthProvider>
    </ApolloProvider>
  )
}

export default App
