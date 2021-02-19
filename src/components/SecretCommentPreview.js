import React from 'react'
import { ListItem, Left, Body, Thumbnail, Text } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'
import { APP_URL } from '../constants'
import { profileName } from '../utils'

const SecretCommentPreview = ({
  comment: { content, secret, user, createdAt },
}) => {
  const { navigate } = useNavigation()

  return (
    <ListItem avatar noBorder>
      <Left>
        <Thumbnail
          small
          source={{
            uri: APP_URL + (secret ? 'fake/anonymous.jpg' : user.image),
          }}
        />
      </Left>
      <Body
        style={{
          backgroundColor: '#f7f7f7',
          padding: 15,
          marginTop: 10,
          marginRight: 10,
          borderRadius: 25,
          borderWidth: 1,
          borderColor: '#e8e8e8',
        }}
      >
        <Text
          style={{ fontSize: 14, fontWeight: 'bold' }}
          onPress={() =>
            secret ? null : navigate('Profile', { userId: user.id })
          }
        >
          {secret ? 'Anonymous' : profileName(user)}
        </Text>
        <Text note style={{ fontSize: 12 }}>
          {moment(+createdAt).fromNow()}
        </Text>
        <Text style={{ textAlign: 'justify', fontSize: 14, marginTop: 4 }}>
          {content}
        </Text>
      </Body>
    </ListItem>
  )
}

export default SecretCommentPreview
