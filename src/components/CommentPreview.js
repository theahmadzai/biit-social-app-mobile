import React from 'react'
import { List, Avatar } from 'react-native-paper'
import { APP_URL } from '../constants'

const CommentPreview = ({ content, user }) => {
  const { username, image } = user

  return (
    <List.Item
      title={username}
      description={content}
      left={props => (
        <Avatar.Image {...props} source={{ uri: APP_URL + image }} />
      )}
      onPress={() => {}}
    />
  )
}

export default CommentPreview
