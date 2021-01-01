import React, { useState } from 'react'
import { Alert, FlatList, RefreshControl } from 'react-native'
import { Container, Form, Item, Input, Icon } from 'native-base'
import { gql, useQuery, useMutation } from '@apollo/client'
import Loading from '../../components/Loading'
import CommentPreview from '../../components/CommentPreview'

const POST_COMMENTS_QUERY = gql`
  query GetPostComments($id: ID!) {
    getPostComments(id: $id) {
      id
      content
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
      createdAt
    }
  }
`

const CREATE_COMMENT_MUTATION = gql`
  mutation CreateComment($input: CreateCommentInput!) {
    createComment(input: $input) {
      id
      content
      user {
        id
        username
        image
      }
    }
  }
`

const CommentsScreen = ({ route }) => {
  const { postId } = route.params

  const [comment, onCommentChange] = useState('')

  const { data, loading, error, refetch, networkStatus } = useQuery(
    POST_COMMENTS_QUERY,
    {
      variables: { id: postId },
    }
  )

  const [createComment, { loading: creatingComment }] = useMutation(
    CREATE_COMMENT_MUTATION,
    {
      onCompleted() {
        onCommentChange('')
      },
      onError(err) {
        Alert.alert(err.name, err.message)
      },
      update(cache, { data: { createComment } }) {
        const existingComments = cache.readQuery({
          query: POST_COMMENTS_QUERY,
          variables: { id: postId },
        })

        cache.writeQuery({
          query: POST_COMMENTS_QUERY,
          variables: { id: postId },
          data: {
            getPostComments: [
              ...existingComments.getPostComments,
              createComment,
            ],
          },
        })
      },
    }
  )

  const createCommentAction = () => {
    createComment({
      variables: {
        input: { content: comment, postId },
      },
    })
  }

  if (loading || creatingComment) return <Loading />
  if (error) {
    Alert.alert(error.name, error.message)
  }

  return (
    <Container>
      <FlatList
        data={data.getPostComments}
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
          <Icon name="send" onPress={createCommentAction} />
        </Item>
      </Form>
    </Container>
  )
}

export default CommentsScreen
