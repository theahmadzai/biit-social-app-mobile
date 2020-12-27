import React, { useState, useEffect } from 'react'
import { Platform, Alert, View } from 'react-native'
import { Title, TextInput, Button } from 'react-native-paper'
import * as ImagePicker from 'expo-image-picker'
import { gql, useMutation } from '@apollo/client'
import mime from 'react-native-mime-types'
import { ReactNativeFile } from 'apollo-upload-client'
import Loading from '../../components/Loading'

const CREATE_GROUP_MUTATION = gql`
  mutation CreateGroup($input: CreateGroupInput!) {
    createGroup(input: $input) {
      name
      description
      image
      owner {
        username
      }
    }
  }
`

const CreateGroupScreen = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState(null)

  useEffect(() => {
    ;(async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync()
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!')
        }
      }
    })()
  }, [])

  const [createGroup, { loading, error }] = useMutation(CREATE_GROUP_MUTATION, {
    onCompleted() {},
    onError(err) {
      Alert.alert(err.name, err.message)
    },
  })

  const pickImageAction = async () => {
    const file = await ImagePicker.launchImageLibraryAsync({
      mediaType: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!file.cancelled) {
      setImage(file)
    }
  }

  const createGroupAction = () => {
    const imageUri = image.uri
    const imageType = mime.lookup(imageUri) || 'image'
    const imageName = `group-image.${mime.extension(imageType)}`

    createGroup({
      variables: {
        input: {
          name,
          description,
          image: new ReactNativeFile({
            uri: imageUri,
            type: imageType,
            name: imageName,
          }),
        },
      },
    })
  }

  if (loading) return <Loading />
  if (error) {
    Alert.alert(error.name, error.message)
  }

  return (
    <View>
      <Title>Create Group Screen</Title>
      <TextInput
        mode="outlined"
        placeholder="Group name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        mode="outlined"
        placeholder="Group description"
        value={description}
        onChangeText={setDescription}
      />
      <Button icon="image" mode="contained" onPress={pickImageAction}>
        Pick Group Image
      </Button>
      <Button mode="contained" onPress={createGroupAction}>
        Create Group
      </Button>
    </View>
  )
}

export default CreateGroupScreen
