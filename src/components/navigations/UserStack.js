import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import UserScreen from '../../screens/UserScreen'
import ProfileScreen from '../../screens/ProfileScreen'
import { useAuth } from '../../contexts/AuthContext'

const Stack = createStackNavigator()

const UserStack = () => {
  const { logout } = useAuth()

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="User"
        component={UserScreen}
        options={({ route }) => ({
          headerRight: () =>
            !(route.params && route.params.id) ? (
              <TouchableOpacity onPress={logout}>
                <Feather name="log-out" size={18} style={{ padding: 20 }} />
              </TouchableOpacity>
            ) : null,
        })}
      />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  )
}

export default UserStack
