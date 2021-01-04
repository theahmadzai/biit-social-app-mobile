import React, { memo } from 'react'
import { Image } from 'react-native'
import {
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Left,
  Body,
  Right,
} from 'native-base'
import { EvilIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'
import { APP_URL } from '../constants'
import { profileName } from '../utils'

const PostPreview = ({ post: { id, text, createdAt, media, user } }) => {
  const navigation = useNavigation()

  return (
    <Card>
      <CardItem>
        <Left>
          <Thumbnail source={{ uri: APP_URL + user.image }} />
          <Body>
            <Text
              style={{ fontWeight: 'bold' }}
              onPress={() => navigation.navigate('Profile', user)}
            >
              {profileName(user)}
            </Text>
            <Text note>{moment(+createdAt).fromNow()}</Text>
          </Body>
        </Left>
      </CardItem>
      {text ? (
        <CardItem bordered>
          <Body>
            <Text>{text}</Text>
          </Body>
        </CardItem>
      ) : null}
      {media ? (
        <CardItem cardBody>
          {media.map((file, index) => (
            <Image
              key={index}
              source={{ uri: APP_URL + file.filename }}
              style={{ height: 200, width: null, flex: 1 }}
            />
          ))}
        </CardItem>
      ) : null}

      <CardItem>
        <Left>
          <Button transparent>
            <EvilIcons name="like" size={34} />
            <Text>Like</Text>
          </Button>
        </Left>
        <Right>
          <Button
            transparent
            onPress={() => navigation.navigate('Comments', { postId: id })}
          >
            <EvilIcons name="comment" size={34} />
            <Text>Comment</Text>
          </Button>
        </Right>
      </CardItem>
    </Card>
  )
}

export default memo(PostPreview)
