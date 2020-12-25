import React from 'react'
import { Card, Avatar, Paragraph } from 'react-native-paper'
import { APP_URL } from '../constants'

const CommentPreview = ({ content, user, createdAt }) => {
  return (
    <Card style={{ marginBottom: 10 }}>
      <Card.Title
        title={user.username}
        subtitle={new Date(Number(createdAt)).toLocaleString()}
        left={props => (
          <Avatar.Image {...props} source={{ uri: APP_URL + user.image }} />
        )}
      />
      <Card.Content>
        <Paragraph>{content}</Paragraph>
      </Card.Content>
    </Card>
  )
}

export default CommentPreview
