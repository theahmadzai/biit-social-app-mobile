import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../../screens/HomeScreen'
import CreateWallPostScreen from '../../screens/CreateWallPostScreen'

const Stack = createStackNavigator()

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="CreateWallPost"
        component={CreateWallPostScreen}
        options={{ title: 'Create Wall Post' }}
      />
    </Stack.Navigator>
  )
}

export default HomeStack
