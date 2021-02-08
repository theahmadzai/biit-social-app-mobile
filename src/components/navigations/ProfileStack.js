import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import ProfileScreen from '../../screens/ProfileScreen'
import { useAuth } from '../../contexts/AuthContext'

const Stack = createStackNavigator()

const ProfileStack = () => {
  const { logout } = useAuth()

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ route }) => ({
          headerRight: () =>
            !(route.params && route.params.id) ? (
              <TouchableOpacity onPress={logout}>
                <Feather name="log-out" size={18} style={{ padding: 20 }} />
              </TouchableOpacity>
            ) : null,
        })}
      />
    </Stack.Navigator>
  )
}

export default ProfileStack
