import React, { useState } from 'react'
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
  Toast,
} from 'native-base'
import * as ImagePicker from 'expo-image-picker'
import { useMutation } from '@apollo/client'
import mime from 'react-native-mime-types'
import { ReactNativeFile } from 'apollo-upload-client'
import { useNavigation } from '@react-navigation/native'
import { USER_GROUPS, CREATE_GROUP } from '../../graphql'
import { useAuth } from '../../contexts/AuthContext'
import Loading from '../../components/Loading'

const CreateGroupScreen = () => {
  const { user } = useAuth()
  const navigation = useNavigation()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState(null)

  const [createGroup, { loading: creatingGroup }] = useMutation(CREATE_GROUP, {
    onCompleted() {
      navigation.navigate('Groups')
    },
    onError(err) {
      Toast.show({
        text: err.message,
        duration: 3000,
        type: 'danger',
      })
    },
    update(cache, { data: { createGroup } }) {
      const { userGroups } = cache.readQuery({
        query: USER_GROUPS,
        variables: { id: user.id },
      })
      cache.writeQuery({
        query: USER_GROUPS,
        variables: { id: user.id },
        data: { userGroups: userGroups.concat([createGroup]) },
      })
    },
  })

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
