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

const Loading = props => (
  <View style={styles.container} {...props}>
    <ActivityIndicator size="large" color="#008e50" />
  </View>
)

export default Loading
