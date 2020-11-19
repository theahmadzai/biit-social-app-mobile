import React from 'react'
import { View, Text, Button } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const SettingsScreen = () => {
  const logout = async () => {
    await AsyncStorage.removeItem('token')
  }

  return (
    <View>
      <Text>Settings</Text>
      <Button color="teal" title="logout" onPress={logout} />
    </View>
  )
}

export default SettingsScreen
