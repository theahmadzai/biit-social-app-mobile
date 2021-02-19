import React, { useState } from 'react'
import { Alert, FlatList, RefreshControl } from 'react-native'
import {
  Container,
  Form,
  Item,
  Input,
  Icon,
  Toast,
  CheckBox,
} from 'native-base'
import { gql, useQuery, useMutation } from '@apollo/client'
import { POST_COMMENTS, CREATE_POST_COMMENT } from '../../graphql'
import Loading from '../../components/Loading'
import SecretCommentPreview from '../../components/SecretCommentPreview'

const SecretCommentsScreen = ({ route }) => {
  const { postId } = route.params

  const [comment, setComment] = useState('')
  const [secret, setSecret] = useState(false)

  const { data, loading, error, refetch, networkStatus } = useQuery(
    POST_COMMENTS,
    {
      variables: { id: postId },
    }
  )

  const [createPostComment, { loading: creatingComment }] = useMutation(
    CREATE_POST_COMMENT,
    {
      onCompleted() {
        setComment('')
      },
      onError(err) {
        Toast.show({
          text: err.message,
          duration: 3000,
          type: 'danger',
        })
      },
      update(cache, { data: { createPostComment } }) {
        const { postComments } = cache.readQuery({
          query: POST_COMMENTS,
          variables: { id: postId },
        })
        cache.writeQuery({
          query: POST_COMMENTS,
          variables: { id: postId },
          data: {
            postComments: postComments.concat([createPostComment]),
          },
        })
        cache.writeFragment({
          id: `Post:${postId}`,
          fragment: gql`
            fragment PostCommentsCount on Post {
              commentsCount
            }
          `,
          data: {
            commentsCount: postComments.length + 1,
          },
        })
      },
    }
  )

  const createPostCommentAction = () => {
    if (!comment.trim().length) return

    createPostComment({
      variables: {
        input: { content: comment, secret, postId },
      },
    })
  }

  if (loading || creatingComment) return <Loading />
  if (error) Alert.alert(error.name, error.message)

  return (
    <Container>
      <FlatList
        data={data.postComments}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => <SecretCommentPreview comment={item} />}
        refreshControl={
          <RefreshControl
            onRefresh={refetch}
            refreshing={networkStatus === 4}
          />
        }
      />
      <Form style={{ padding: 10 }}>
        <Item regular>
          <Input
            placeholder="Comment..."
            value={comment}
            onChangeText={setComment}
          />
          <CheckBox
            color="#000"
            style={{ marginRight: 15 }}
            checked={secret}
            onPress={() => setSecret(!secret)}
          />
          <Icon name="send" onPress={createPostCommentAction} />
        </Item>
      </Form>
    </Container>
  )
}

export default SecretCommentsScreen
