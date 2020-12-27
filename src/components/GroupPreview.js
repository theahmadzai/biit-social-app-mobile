import React from 'react'
import { List, Avatar } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { APP_URL } from '../constants'

const GroupPreview = group => {
  const navigation = useNavigation()

  return (
    <List.Item
      title={group.name}
      description={group.description}
      descriptionNumberOfLines={1}
      left={props => (
        <Avatar.Image {...props} source={{ uri: APP_URL + group.image }} />
      )}
      onPress={() => {
        navigation.navigate('Posts', group)
      }}
    />
  )
}

export default GroupPreview
