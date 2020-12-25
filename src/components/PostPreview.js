import React from 'react'
import { FlatList, Image } from 'react-native'
import { Avatar, Button, Card, Paragraph } from 'react-native-paper'
import { AntDesign, Fontisto } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { APP_URL } from '../constants'

const Media = ({ list }) => {
  if (!list.length) {
    return null
  }

  return (
    <FlatList
      data={list}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => (
        <Image
          style={{ flex: 1, width: null, height: 200, marginTop: 10 }}
          source={{ uri: APP_URL + item.filename }}
        />
      )}
    />
  )
}

const PostPreview = ({ id, text, createdAt, media, user }) => {
  const navigation = useNavigation()

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
        <Paragraph>{text}</Paragraph>
        <Media list={media} />
      </Card.Content>
      <Card.Actions style={{ flex: 1, justifyContent: 'space-between' }}>
        <Button>
          <AntDesign name="like2" size={20} />
        </Button>
        <Button
          onPress={() => {
            navigation.navigate('Comments', { postId: id })
          }}
        >
          <Fontisto name="comment" size={20} />
        </Button>
      </Card.Actions>
    </Card>
  )
}

export default PostPreview
