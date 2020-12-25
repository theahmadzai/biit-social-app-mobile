import React from 'react'
import { StyleSheet, View, Image } from 'react-native'

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../../assets/signin.png')} />
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
})
