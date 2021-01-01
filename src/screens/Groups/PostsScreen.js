import React, { useEffect, useState, useMemo } from 'react'
import { Platform, Alert, RefreshControl, Image, FlatList } from 'react-native'
import { Container, Form, Item, Input, Icon, Thumbnail } from 'native-base'
import { gql, useQuery, useMutation } from '@apollo/client'
import * as ImagePicker from 'expo-image-picker'
import mime from 'react-native-mime-types'
import { ReactNativeFile } from 'apollo-upload-client'
import { useAuth } from '../../contexts/AuthContext'
import PostPreview from '../../components/PostPreview'
import Loading from '../../components/Loading'
import { APP_URL } from '../../constants'

const GROUP_POSTS_QUERY = gql`
  query GetGroupPosts($id: ID!) {
    getGroupPosts(id: $id) {
      id
      text
      createdAt
      media {
        id
        filename
      }
      user {
        id
        username
        image
        profile {
          firstName
          middleName
          lastName
        }
      }
    }
  }
`

const CREATE_POST_MUTATION = gql`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      id
      text
      createdAt
      media {
        id
        filename
      }
      user {
        id
        username
        image
        profile {
          firstName
          middleName
          lastName
        }
      }
    }
  }
`

const PostsScreen = ({ route }) => {
  const { id: groupId } = route.params.group

  const [text, onTextChange] = useState('')
  const [files, setFiles] = useState([])

  const { user } = useAuth()

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

  const {
    data,
    loading,
    error,
    refetch,
    networkStatus,
  } = useQuery(GROUP_POSTS_QUERY, { variables: { id: groupId } })

  const [createPost, { loading: creatingPost }] = useMutation(
    CREATE_POST_MUTATION,
    {
      onCompleted() {
        onTextChange('')
        setFiles([])
      },
      onError(err) {
        Alert.alert(err.name, err.message)
      },
      update(cache, { data: { createPost } }) {
        const existingPosts = cache.readQuery({
          query: GROUP_POSTS_QUERY,
          variables: { id: groupId },
        })

        cache.writeQuery({
          query: GROUP_POSTS_QUERY,
          variables: { id: groupId },
          data: {
            getGroupPosts: [createPost, ...existingPosts.getGroupPosts],
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
        setFiles([...files, file])
      }
    }

    const createPostAction = () => {
      createPost({
        variables: {
          input: {
            text,
            media: files.map(({ uri }, i) => {
              const type = mime.lookup(uri) || 'image'
              const name = `file-${i}.${mime.extension(type)}`

              return new ReactNativeFile({
                uri,
                type,
                name,
              })
            }),
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
            onChangeText={onTextChange}
          />
          <Icon name="image" onPress={pickImageAction} />
          <Icon name="send" onPress={createPostAction} />
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
  }, [createPost, groupId, files, text, user.image])

  if (loading || creatingPost) return <Loading />
  if (error) {
    Alert.alert(error.name, error.message)
  }

  return (
    <Container>
      <FlatList
        ListHeaderComponent={headerComponent}
        data={data.getGroupPosts}
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
