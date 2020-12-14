import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import GroupsScreen from '../screens/GroupsScreen'
import GroupScreen from '../screens/GroupScreen'

const Stack = createStackNavigator()

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Groups" component={GroupsScreen} />
      <Stack.Screen name="Group" component={GroupScreen} />
    </Stack.Navigator>
  )
}

export default StackNavigator
