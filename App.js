import 'react-native-gesture-handler'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { createUploadLink } from 'apollo-upload-client'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Provider as PaperProvider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { AuthProvider } from './src/contexts/AuthContext'
import InitialScreen from './src/screens/InitialScreen'

const API_URL = 'http://192.168.1.2:3000/graphql'

const client = new ApolloClient({
  link: ApolloLink.from([
    setContext(async (_, { headers }) => {
      let auth = await AsyncStorage.getItem('auth')
      let token = null

      if (auth) {
        const authState = JSON.parse(auth)

        if ('token' in authState) {
          token = authState.token
        }
      }

      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : null,
        },
      }
    }),
    createUploadLink({ uri: API_URL }),
  ]),
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
