import React, { useState } from 'react'
import { StyleSheet, View, Text, Image, TextInput, Button } from 'react-native'
import { useAuth } from '../contexts/AuthContext'
import Loading from '../components/Loading'

const LoginScreen = () => {
  const [username, onChangeUsername] = useState('2017-ARID-0264')
  const [password, onChangePassword] = useState('123')

  const { loading, login } = useAuth()

  if (loading) return <Loading />

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Sign In</Text>
      </View>

      <Image style={styles.image} source={require('../../assets/signin.png')} />

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={onChangeUsername}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={onChangePassword}
          secureTextEntry={true}
        />

        <Button
          color="teal"
          title="Login"
          onPress={() => login(username, password)}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 10,
    marginBottom: 20,
    backgroundColor: 'teal',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
  form: {
    padding: 10,
  },
  input: {
    padding: 5,
    borderWidth: 1,
    marginBottom: 10,
  },
})

export default LoginScreen