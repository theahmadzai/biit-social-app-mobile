import React, { useState, useMemo } from 'react'
import { Alert, RefreshControl, Image, FlatList } from 'react-native'
import {
  Container,
  Form,
  Item,
  Input,
  Icon,
  Thumbnail,
  Toast,
} from 'native-base'
import { useQuery, useMutation } from '@apollo/client'
import * as ImagePicker from 'expo-image-picker'
import mime from 'react-native-mime-types'
import { ReactNativeFile } from 'apollo-upload-client'
import { GROUP_POSTS, CREATE_GROUP_POST } from '../../graphql'
import { useAuth } from '../../contexts/AuthContext'
import PostPreview from '../../components/PostPreview'
import Loading from '../../components/Loading'
import { APP_URL } from '../../constants'

const PostsScreen = ({ route }) => {
  const { id: groupId } = route.params.group

  const [text, setText] = useState('')
  const [files, setFiles] = useState([])

  const { user } = useAuth()

  const { data, loading, error, refetch, networkStatus } = useQuery(
    GROUP_POSTS,
    { variables: { id: groupId } }
  )

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
        const existingPosts = cache.readQuery({
          query: GROUP_POSTS,
          variables: { id: groupId },
        })

        cache.writeQuery({
          query: GROUP_POSTS,
          variables: { id: groupId },
          data: {
            groupPosts: [createGroupPost, ...existingPosts.groupPosts],
          },
        })
      },
    }
  )

  const headerComponent = useMemo(() => {
    const pickImageAction = async () => {
      const file = await ImagePicker.launchImageLibraryAsync({
        mediaType: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      })

      if (!file.cancelled) {
        const type = mime.lookup(file.uri) || 'image'
        const name = `file-${files.length}.${mime.extension(type)}`

        setFiles([
          ...files,
          {
            uri: file.uri,
            type,
            name,
          },
        ])
      }
    }

    const createGroupPostAction = () => {
      createGroupPost({
        variables: {
          input: {
            text,
            media: files.map(file => new ReactNativeFile(file)),
            groupId,
          },
        },
      })
    }

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
  }, [createGroupPost, groupId, files, text, user.image])

  if (loading || creatingPost) return <Loading />
  if (error) Alert.alert(error.name, error.message)

  return (
    <Container>
      <FlatList
        ListHeaderComponent={headerComponent}
        data={data.groupPosts}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => <PostPreview post={item} />}
        refreshControl={
          <RefreshControl
            onRefresh={refetch}
            refreshing={networkStatus === 4}
          />
        }
      />
    </Container>
  )
}

export default PostsScreen
