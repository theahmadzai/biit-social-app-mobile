import React, { useState, useEffect } from 'react'
import { Platform, Alert } from 'react-native'
import {
  Form,
  Item,
  Text,
  Input,
  Button,
  Container,
  Icon,
  Label,
  Thumbnail,
} from 'native-base'
import * as ImagePicker from 'expo-image-picker'
import { gql, useMutation } from '@apollo/client'
import mime from 'react-native-mime-types'
import { ReactNativeFile } from 'apollo-upload-client'
import { useNavigation } from '@react-navigation/native'
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

  const navigation = useNavigation()

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

  const [createGroup, { loading: creatingGroup }] = useMutation(
    CREATE_GROUP_MUTATION,
    {
      onCompleted() {
        navigation.navigate('Groups')
      },
      onError(err) {
        Alert.alert(err.name, err.message)
      },
    }
  )

  const pickImageAction = async () => {
    const file = await ImagePicker.launchImageLibraryAsync({
      mediaType: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    })

    if (!file.cancelled) {
      const type = mime.lookup(file.uri) || 'image'
      const name = `group-image.${mime.extension(type)}`

      setImage({ uri: file.uri, type, name })
    }
  }

  const createGroupAction = () => {
    createGroup({
      variables: {
        input: {
          name,
          description,
          image: image ? new ReactNativeFile(image) : null,
        },
      },
    })
  }

  if (creatingGroup) return <Loading />

  return (
    <Container>
      <Form style={{ padding: 10 }}>
        <Item regular style={{ marginBottom: 10 }}>
          {image ? (
            <Thumbnail
              style={{ marginLeft: 10 }}
              small
              source={{ uri: image.uri }}
            />
          ) : null}
          <Input placeholder="Name" value={name} onChangeText={setName} />
          <Icon name="image" onPress={pickImageAction} />
        </Item>
        <Item floatingLabel last style={{ marginBottom: 10 }}>
          <Label>Description</Label>
          <Input
            multiline
            numberOfLines={4}
            value={description}
            onChangeText={setDescription}
          />
        </Item>
        <Button dark onPress={createGroupAction}>
          <Text>Create Group</Text>
        </Button>
      </Form>
    </Container>
  )
}

export default CreateGroupScreen
