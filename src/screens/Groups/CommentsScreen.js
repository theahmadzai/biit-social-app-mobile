import React, { useState } from 'react'
import { Alert, FlatList, RefreshControl } from 'react-native'
import { Container, Form, Item, Input, Icon, Toast } from 'native-base'
import { useQuery, useMutation } from '@apollo/client'
import { POST_COMMENTS, CREATE_POST_COMMENT } from '../../graphql'
import Loading from '../../components/Loading'
import CommentPreview from '../../components/CommentPreview'

const CommentsScreen = ({ route }) => {
  const { postId } = route.params

  const [comment, onCommentChange] = useState('')

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
        onCommentChange('')
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
      },
    }
  )

  const createPostCommentAction = () => {
    if (!comment.trim().length) return

    createPostComment({
      variables: {
        input: { content: comment, postId },
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
        renderItem={({ item }) => <CommentPreview comment={item} />}
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
            onChangeText={onCommentChange}
          />
          <Icon name="send" onPress={createPostCommentAction} />
        </Item>
      </Form>
    </Container>
  )
}

export default CommentsScreen
