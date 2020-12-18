import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  TextInput,
  Platform,
} from 'react-native'
import { gql, useMutation } from '@apollo/client'
import * as ImagePicker from 'expo-image-picker'
import Loading from '../../components/Loading'

const CreatePostScreen = ({ route }) => {
  const { groupId } = route.params
  const [title, onTitleChange] = useState('')
  const [text, onTextChange] = useState('')
  const [image, onImagePick] = useState(null)

  const [createPost, { loading }] = useMutation(
    gql`
      mutation createPost($input: PostInput!) {
        createPost(input: $input) {
          id
          title
        }
      }
    `,
    {
      onCompleted: () => {},
    }
  )

  useEffect(() => {
    ;(async () => {
      if (Platform.OS !== 'web') {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!')
        }
      }
    })()
  }, [])

  if (loading) return <Loading />

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaType: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      allowsEditing: false,
      aspect: [4, 3],
    })

    if (!result.cancelled) {
      onImagePick(result.uri)
    }
  }

  const submitPost = async () => {
    createPost({
      variables: {
        input: {
          title,
          text,
          media: image,
          group: groupId,
        },
      },
    })
  }

  return (
    <View>
      <Text>Post Screen {groupId}</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Post title..."
        value={title}
        onChangeText={onTitleChange}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Description..."
        value={text}
        onChangeText={onTextChange}
        multiline={true}
        numberOfLines={5}
      />
      <Button title="Browse" onPress={pickImage} />
      {image !== null ? (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      ) : null}

      <Button title="Submit" onPress={submitPost} />
    </View>
  )
}

export default CreatePostScreen

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: 'gray',
    height: 40,
    marginBottom: 10,
    padding: 10,
  },
})
