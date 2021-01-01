import React from 'react'
import { ListItem, Left, Body, Thumbnail, Text } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { APP_URL } from '../constants'

const GroupPreview = ({ group }) => {
  const navigation = useNavigation()

  return (
    <ListItem thumbnail onPress={() => navigation.navigate('Posts', { group })}>
      <Left avatar>
        <Thumbnail source={{ uri: APP_URL + group.image }} />
      </Left>
      <Body>
        <Text>{group.name}</Text>
        <Text note>{group.description}</Text>
      </Body>
    </ListItem>
  )
}

export default GroupPreview
