import React from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

const Loading = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="teal" />
  </View>
)

export default Loading
