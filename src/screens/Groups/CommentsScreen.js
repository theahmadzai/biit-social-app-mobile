import React, { useState } from 'react'
import { FlatList, View, Text } from 'react-native'
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
      }
    }
  }
`

const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($input: CommentInput!) {
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
  const { postId: id } = route.params

  const [comment, onCommentChange] = useState('')

  const { data, loading, error } = useQuery(POST_COMMENTS_QUERY, {
    variables: { id },
  })

  const [createComment, { loadingComment }] = useMutation(
    CREATE_COMMENT_MUTATION,
    {
      onCompleted() {
        onCommentChange('')
      },
      update(cache, { data: { createComment } }) {
        const existingComments = cache.readQuery({
          query: POST_COMMENTS_QUERY,
          variables: { id },
        })
        cache.writeQuery({
          query: POST_COMMENTS_QUERY,
          variables: { id },
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

  if (loading) return <Loading />
  if (error)
    return (
      <View>
        <Text>`Error! ${error.message}`</Text>
      </View>
    )

  return (
    <FlatList
      ListHeaderComponent={
        <TextInput
          style={{ margin: 10 }}
          disabled={loadingComment}
          mode="outlined"
          label="Comment"
          value={comment}
          onChangeText={onCommentChange}
          right={
            <TextInput.Icon
              name="send"
              onPress={() => {
                createComment({
                  variables: {
                    input: { content: comment, post: id },
                  },
                })
              }}
            />
          }
        />
      }
      data={data.getPostComments}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => <CommentPreview {...item} />}
    />
  )
}

export default CommentsScreen
