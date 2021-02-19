import React, { useState } from 'react'
import { Image, FlatList } from 'react-native'
import { Form, Item, Input, Icon, Thumbnail, Toast } from 'native-base'
import { useMutation } from '@apollo/client'
import * as ImagePicker from 'expo-image-picker'
import mime from 'react-native-mime-types'
import { ReactNativeFile } from 'apollo-upload-client'
import { GROUP_POSTS, CREATE_GROUP_POST } from '../graphql'
import { useAuth } from '../contexts/AuthContext'
import Loading from './Loading'
import { APP_URL } from '../constants'

const CreatePostForm = ({ postableId }) => {
  const { user } = useAuth()

  const [text, setText] = useState('')
  const [files, setFiles] = useState([])

  const [createGroupPost, { loading: creatingPost }] = useMutation(
    CREATE_GROUP_POST,
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
      update(cache, { data: { createGroupPost } }) {
        const { groupPosts } = cache.readQuery({
          query: GROUP_POSTS,
          variables: { id: postableId },
        })

        cache.writeQuery({
          query: GROUP_POSTS,
          variables: { id: postableId },
          data: {
            groupPosts: [createGroupPost, ...groupPosts],
          },
        })
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

  const createGroupPostAction = () => {
    createGroupPost({
      variables: {
        input: {
          text,
          media: files.map(file => new ReactNativeFile(file)),
          postableId: postableId,
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
        <Icon name="image" onPress={pickImageAction} />
        <Icon name="send" onPress={createGroupPostAction} />
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

export default CreatePostForm
