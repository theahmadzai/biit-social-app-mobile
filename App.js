import 'react-native-gesture-handler'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { useFonts } from 'expo-font'
import { Ionicons } from '@expo/vector-icons'
import { ApolloProvider } from '@apollo/client'
import { Provider as PaperProvider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import client from './src/client'
import { AuthProvider } from './src/contexts/AuthContext'
import InitialScreen from './src/screens/InitialScreen'
import SplashScreen from './src/screens/SplashScreen'

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
