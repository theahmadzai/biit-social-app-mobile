import React, { useState } from 'react'
import { Image, FlatList } from 'react-native'
import {
  Form,
  Item,
  Input,
  Icon,
  Thumbnail,
  Toast,
  CheckBox,
} from 'native-base'
import { useMutation } from '@apollo/client'
import * as ImagePicker from 'expo-image-picker'
import mime from 'react-native-mime-types'
import { ReactNativeFile } from 'apollo-upload-client'
import { USER_CLASS_POSTS, CREATE_CLASS_POST } from '../graphql'
import { useAuth } from '../contexts/AuthContext'
import Loading from './Loading'
import { APP_URL } from '../constants'

const CreateUserClassPostForm = ({ addNewPostAndTag }) => {
  const { user } = useAuth()

  const [text, setText] = useState('')
  const [secret, setSecret] = useState(false)
  const [files, setFiles] = useState([])

  const [createClassPost, { loading: creatingPost }] = useMutation(
    CREATE_CLASS_POST,
    {
      onCompleted() {
        setText('')
        setFiles([])
      },
      onError(err) {
        Toast.show({
          text: err.message,
          duration: 3000,
          type: 'danger',
        })
      },
      update(cache, { data: { createClassPost } }) {
        const { userClassPosts } = cache.readQuery({
          query: USER_CLASS_POSTS,
        })

        cache.writeQuery({
          query: USER_CLASS_POSTS,
          data: {
            userClassPosts: [createClassPost, ...userClassPosts],
          },
        })

        addNewPostAndTag(createClassPost)
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
      const name = `file-${files.length}.${mime.extension(type)}`

      setFiles([...files, { uri: file.uri, type, name }])
    }
  }

  const createClassPostAction = () => {
    createClassPost({
      variables: {
        input: {
          text,
          secret,
          media: files.map(file => new ReactNativeFile(file)),
        },
      },
    })
  }

  if (creatingPost) return <Loading style={{ padding: 10 }} />

  return (
    <Form style={{ padding: 10 }}>
      <Item rounded>
        <Thumbnail
          style={{ marginLeft: 10 }}
          small
          source={{ uri: APP_URL + user.image }}
        />
        <Input
          placeholder="Write something..."
          value={text}
          onChangeText={setText}
        />
        <CheckBox
          color="#000"
          style={{ marginRight: 15 }}
          checked={secret}
          onPress={() => setSecret(!secret)}
        />
        <Icon name="image" onPress={pickImageAction} />
        <Icon name="send" onPress={createClassPostAction} />
      </Item>
      <FlatList
        horizontal
        data={files}
        keyExtractor={({ uri }) => uri}
        renderItem={({ item: { uri } }) => (
          <Image
            source={{ uri }}
            style={{
              borderWidth: 1,
              borderColor: '#999999',
              height: 70,
              width: 70,
              marginTop: 10,
              marginRight: 10,
            }}
          />
        )}
      />
    </Form>
  )
}

export default CreateUserClassPostForm
