import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import NotificationsScreen from '../../screens/NotificationsScreen'

const Stack = createStackNavigator()

const NotificationsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
    </Stack.Navigator>
  )
}

export default NotificationsStack
