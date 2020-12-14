import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screens/HomeScreen'
import GroupsScreen from '../screens/GroupsScreen'
import PostScreen from '../screens/PostScreen'
import ProfileScreen from '../screens/ProfileScreen'
import NotificationsScreen from '../screens/NotificationsScreen'
import BottomNavigation from './BottomTabNavigator'

const Stack = createStackNavigator()

const StackNavigator = () => {
  return (
    <>
      {/* <BottomNavigation /> */}
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Groups" component={GroupsScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Post" component={PostScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
      </Stack.Navigator>
    </>
  )
}

export default StackNavigator
