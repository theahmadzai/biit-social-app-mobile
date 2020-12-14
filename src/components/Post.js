import React from 'react'
import { StyleSheet } from 'react-native'
import { Avatar, Button, Card, Paragraph } from 'react-native-paper'

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const Post = ({ title, content, image, date }) => (
  <Card style={styles.post}>
    <Card.Title
      title={title}
      subtitle={new Date(Number(date)).toDateString()}
      left={LeftContent}
    />
    <Card.Cover source={{ uri: image }} />
    <Card.Content style={{ marginTop: 10 }}>
      <Paragraph>{content}</Paragraph>
    </Card.Content>
    <Card.Actions>
      <Button>Like</Button>
      <Button>Dislike</Button>
      <Button>Comment</Button>
    </Card.Actions>
  </Card>
)

export default Post

const styles = StyleSheet.create({
  post: {
    marginBottom: 10,
  },
})
