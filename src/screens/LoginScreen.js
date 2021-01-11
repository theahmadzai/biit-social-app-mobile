import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
} from 'react-native'
import { Container, Item, Input, Button } from 'native-base'
import { useAuth } from '../contexts/AuthContext'
import Loading from '../components/Loading'

const LoginScreen = () => {
  const [username, setUsername] = useState('2017-ARID-103')
  const [password, setPassword] = useState('123')

  const { login, loginLoading } = useAuth()

  if (loginLoading) return <Loading />

  return (
    <Container>
      <KeyboardAvoidingView behavior="position">
        <Image
          style={styles.image}
          source={require('../../assets/signin.png')}
        />

        <View style={styles.form}>
          <Item style={styles.input} regular>
            <Input
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
            />
          </Item>

          <Item style={styles.input} regular>
            <Input
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
            />
          </Item>

          <Button
            style={styles.button}
            full
            onPress={() => login(username, password)}
          >
            <Text style={styles.buttonText}>Login</Text>
          </Button>
        </View>
      </KeyboardAvoidingView>
    </Container>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginTop: 80,
  },
  form: {
    padding: 20,
  },
  input: {
    marginTop: 10,
    borderRadius: 5,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#008e50',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
})

export default LoginScreen
