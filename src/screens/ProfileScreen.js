import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Button, Appbar, Divider } from 'react-native-paper'
import { useAuth } from '../contexts/AuthContext'

const ProfileScreen = () => {
  const { logout, token, user } = useAuth()

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Profile" />
      </Appbar.Header>
      <View style={styles.container}>
        <Text>AccessToken: {token}</Text>
        <Divider style={{ marginVertical: 10 }} />
        <Text>Username: {user.username}</Text>
        <Divider style={{ marginVertical: 10 }} />
        <Text>
          Name: {user.firstName} {user.lastName}
        </Text>
        <Divider style={{ marginVertical: 10 }} />
        <Text>Email: {user.email}</Text>
        <Divider style={{ marginVertical: 10 }} />
        <Button mode="contained" onPress={logout}>
          Logout
        </Button>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
})

export default ProfileScreen
