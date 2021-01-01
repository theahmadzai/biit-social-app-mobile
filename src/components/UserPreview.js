import React from 'react'
import { ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { APP_URL } from '../constants'
import { profileName, profileDescription } from '../utils'

const UserPreview = ({ user, right }) => {
  const navigation = useNavigation()

  return (
    <ListItem
      noBorder
      avatar
      onPress={() => navigation.navigate('Profile', user)}
    >
      <Left>
        <Thumbnail small source={{ uri: APP_URL + user.image }} />
      </Left>
      <Body>
        <Text>{profileName(user)}</Text>
        <Text note>{profileDescription(user)}</Text>
      </Body>
      <Right>{right}</Right>
    </ListItem>
  )
}

export default UserPreview
