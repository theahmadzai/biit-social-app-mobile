import React, { useEffect, useState } from 'react'
import { Platform, Image, FlatList, Alert } from 'react-native'
import { Avatar, TextInput, Card } from 'react-native-paper'
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
      user {
        id
        username
        image
      }
      media {
        id
        filename
      }
      createdAt
    }
  }
`

const CREATE_POST_MUTATION = gql`
  mutation CreatePost($input: PostInput!) {
    createPost(input: $input) {
      id
      text
      user {
        id
        username
        image
      }
      media {
        id
        filename
      }
      createdAt
    }
  }
`

const PostsScreen = ({ route }) => {
  const { id: groupId } = route.params

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

  const pickImage = async () => {
    const file = await ImagePicker.launchImageLibraryAsync({
      mediaType: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!file.cancelled) {
      setFiles([...files, file])
    }
  }

  const submitPost = () => {
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

  if (loading) return <Loading />
  if (error) {
    Alert.alert(error.name, error.message)
  }

  return (
    <FlatList
      ListHeaderComponent={
        <Card style={{ marginBottom: 10 }}>
          <Card.Title
            title={user.username}
            left={props => (
              <Avatar.Image {...props} source={{ uri: APP_URL + user.image }} />
            )}
          />
          <Card.Content>
            <TextInput
              mode="outlined"
              placeholder="Write something here..."
              value={text}
              onChangeText={onTextChange}
              multiline={true}
              disabled={creatingPost}
              left={<TextInput.Icon name="image" onPress={pickImage} />}
              right={<TextInput.Icon name="send" onPress={submitPost} />}
            />
            {files
              ? files.map(({ uri }, i) => (
                  <Image
                    key={i}
                    source={{ uri }}
                    style={{ width: 200, height: 200 }}
                  />
                ))
              : null}
            {creatingPost ? <Loading style={{ marginTop: 10 }} /> : null}
          </Card.Content>
        </Card>
      }
      data={data.getGroupPosts}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => <PostPreview {...item} />}
      onRefresh={refetch}
      refreshing={networkStatus === 4}
    />
  )
}

export default PostsScreen
