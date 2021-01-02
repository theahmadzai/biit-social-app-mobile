import 'react-native-gesture-handler'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { useFonts } from 'expo-font'
import { Ionicons } from '@expo/vector-icons'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
  split,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { createUploadLink } from 'apollo-upload-client'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'
import { Provider as PaperProvider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { getAuthToken } from './src/utils'
import { AuthProvider } from './src/contexts/AuthContext'
import InitialScreen from './src/screens/InitialScreen'
import SplashScreen from './src/screens/SplashScreen'

const API_URL = 'http://192.168.1.2:3000/graphql'

const client = new ApolloClient({
  link: split(
    ({ query }) => {
      const definition = getMainDefinition(query)
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      )
    },
    new WebSocketLink({
      uri: `ws://192.168.1.2:3000/graphql`,
      options: {
        reconnect: true,
        async connectionParams() {
          return { authToken: await getAuthToken() }
        },
      },
    }),
    ApolloLink.from([
      setContext(async (_, { headers }) => ({
        headers: { ...headers, authorization: await getAuthToken() },
      })),
      createUploadLink({ uri: API_URL }),
    ])
  ),
  cache: new InMemoryCache(),
})

const App = () => {
  const [loaded] = useFonts({
    Roboto: require('native-base/Fonts/Roboto.ttf'),
    Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    ...Ionicons.font,
  })

  if (!loaded) return <SplashScreen />

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
