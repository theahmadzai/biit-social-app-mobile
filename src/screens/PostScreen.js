import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Appbar, TextInput, Checkbox, Button } from 'react-native-paper'

const PostScreen = () => (
  <>
    <Appbar.Header>
      <Appbar.Content title="Create A Post" />
    </Appbar.Header>
    <View style={styles.container}>
      <TextInput mode="outlined" placeholder="Title" />
      <TextInput
        mode="outlined"
        multiline={true}
        numberOfLines={10}
        placeholder="Title"
      />
      <Checkbox.Item label="BSCS" />
      <Checkbox.Item label="BSIS" />
      <Button mode="contained">Post</Button>
    </View>
  </>
)

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
})

export default PostScreen
