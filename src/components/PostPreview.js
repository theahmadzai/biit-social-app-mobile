import React from 'react'
import { StyleSheet, FlatList, Image, View } from 'react-native'
import { Avatar, Button, Card, Paragraph } from 'react-native-paper'
import { AntDesign, Fontisto } from '@expo/vector-icons'
import { APP_URL } from '../constants'

const Media = ({ list }) => {
  if (!list.length) {
    return null
  }

  return (
    <View style={{ flex: 1 }}>
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
    </View>
  )
}

const PostPreview = ({
  navigation,
  id,
  text,
  createdAt: date,
  media,
  user,
}) => {
  return (
    <Card style={styles.post}>
      <Card.Title
        title={user.username}
        subtitle={new Date(Number(date)).toDateString()}
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
            navigation.navigate('Comments', {
              postId: id,
            })
          }}
        >
          <Fontisto name="comment" size={20} />
        </Button>
      </Card.Actions>
    </Card>
  )
}

export default PostPreview

const styles = StyleSheet.create({
  post: {
    marginBottom: 10,
  },
})
