import React, { memo, useState } from 'react'
import { Alert, Image } from 'react-native'
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
import { gql, useQuery, useMutation } from '@apollo/client'
import { FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'
import { POST_LIKES, TOGGLE_POST_LIKE } from '../graphql'
import { APP_URL } from '../constants'
import { profileName } from '../utils'

const IS_POST_LIKED_BY_USER = gql`
  query IsPostLikedByUser($id: ID!) {
    isPostLikedByUser(id: $id)
  }
`

const PostPreview = ({
  post: { id, text, createdAt, media, user, likesCount, commentsCount },
}) => {
  const navigation = useNavigation()
  const [isLiked, setIsLiked] = useState(false)

  useQuery(IS_POST_LIKED_BY_USER, {
    variables: { id },
    onCompleted({ isPostLikedByUser }) {
      setIsLiked(isPostLikedByUser)
    },
  })

  const [like] = useMutation(TOGGLE_POST_LIKE, {
    onError(err) {
      Alert.alert(err.name, err.message)
    },
    onCompleted() {
      setIsLiked(!isLiked)
    },
    update(cache, { data: { togglePostLike } }) {
      cache.writeQuery({
        query: POST_LIKES,
        variables: { id },
        data: {
          postLikes: togglePostLike,
        },
      })
      cache.writeFragment({
        id: `Post:${id}`,
        fragment: gql`
          fragment PostLikesCount on Post {
            likesCount
          }
        `,
        data: {
          likesCount: togglePostLike.length,
        },
      })
    },
  })

  const likeAction = () => {
    like({ variables: { id } })
  }

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

      <CardItem bordered>
        <Left>
          <Text>
            {likesCount} {likesCount === 1 ? 'Like' : 'Likes'}
          </Text>
        </Left>
        <Right>
          <Text>
            {commentsCount} {commentsCount === 1 ? 'Comment' : 'Comments'}
          </Text>
        </Right>
      </CardItem>
      <CardItem style={{ marginHorizontal: 10 }}>
        <Left>
          <Button
            transparent
            onPress={likeAction}
            onLongPress={() => navigation.navigate('Likes', { postId: id })}
          >
            {isLiked ? (
              <FontAwesome name="thumbs-o-down" size={30} />
            ) : (
              <FontAwesome name="thumbs-o-up" size={30} />
            )}
          </Button>
        </Left>
        <Right>
          <Button
            transparent
            onPress={() => navigation.navigate('Comments', { postId: id })}
          >
            <FontAwesome name="comment-o" size={30} />
          </Button>
        </Right>
      </CardItem>
    </Card>
  )
}

export default memo(PostPreview)
