import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>BIIT SOCIAL APP</Text>
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'teal',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'monospace',
  },
})
