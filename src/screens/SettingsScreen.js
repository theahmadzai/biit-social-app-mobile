import React from 'react'
import { View, Text, Button } from 'react-native'
import { useAuth } from '../contexts/AuthContext'

const SettingsScreen = () => {
  const { logout, token, user } = useAuth()

  return (
    <View>
      <Text>Settings</Text>
      <Text>Token: {token}</Text>
      <Text>Username: {user.username}</Text>
      <Text>
        Name: {user.firstName} {user.lastName}
      </Text>
      <Text>Email: {user.email}</Text>
      <Button color="teal" title="logout" onPress={logout} />
    </View>
  )
}

export default SettingsScreen
