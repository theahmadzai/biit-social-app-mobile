import React, { useState } from 'react'
import { FlatList, Alert } from 'react-native'
import { TextInput } from 'react-native-paper'
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

  const { data, loading, refetch, networkStatus } = useQuery(
    POST_COMMENTS_QUERY,
    {
      variables: { id: postId },
    }
  )

  const [createComment, { loading: creatingComment, error }] = useMutation(
    CREATE_COMMENT_MUTATION,
    {
      onCompleted() {
        onCommentChange('')
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

  const submitComment = () => {
    createComment({
      variables: {
        input: { content: comment, postId },
      },
    })
  }

  if (loading) return <Loading />
  if (error) {
    Alert.alert(error.name, error.message)
  }

  return creatingComment ? (
    <Loading />
  ) : (
    <FlatList
      ListHeaderComponent={
        <TextInput
          style={{ margin: 10 }}
          mode="outlined"
          placeholder="Comment something..."
          value={comment}
          onChangeText={onCommentChange}
          multiline={true}
          disabled={creatingComment}
          right={<TextInput.Icon name="send" onPress={submitComment} />}
        />
      }
      data={data.getPostComments}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => <CommentPreview {...item} />}
      onRefresh={refetch}
      refreshing={networkStatus === 4}
    />
  )
}

export default CommentsScreen
