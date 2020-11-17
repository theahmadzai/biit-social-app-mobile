import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { View, Text, Button } from 'react-native'

const SettingsScreen = (): JSX.Element => {
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
