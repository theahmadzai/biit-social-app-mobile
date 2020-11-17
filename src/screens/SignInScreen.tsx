import React, { useState } from 'react'
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
} from 'react-native'
import { gql, useMutation } from '@apollo/client'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loading from '../components/Loading'

const LOGIN_USER = gql`
  mutation LoginUser($credentials: AuthInput!) {
    login(input: $credentials) {
      token
      user {
        id
        name
        email
      }
    }
  }
`

const SignInScreen = (): JSX.Element => {
  const [username, onChangeUsername] = useState('2017-ARID-0264')
  const [password, onChangePassword] = useState('123')
  const [login, { loading }] = useMutation(LOGIN_USER, {
    onCompleted: async ({ login }) => {
      await AsyncStorage.setItem('token', login.token)
    },
  })

  if (loading) return <Loading />

  const loginUser = () => {
    login({ variables: { credentials: { username, password } } })
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Sign In</Text>
      </View>

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
        />

        <Button color="teal" title="Login" onPress={loginUser} />
      </View>
    </SafeAreaView>
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
  form: {
    padding: 10,
  },
  input: {
    padding: 5,
    borderWidth: 1,
    marginBottom: 10,
  },
})

export default SignInScreen
