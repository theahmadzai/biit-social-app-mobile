import React from 'react'
import { List, Avatar } from 'react-native-paper'
import { APP_URL } from '../constants'

const GroupPreview = ({ navigation, ...group }) => {
  const { name, description, logo } = group

  return (
    <List.Item
      title={name}
      description={description}
      descriptionNumberOfLines={1}
      left={props => (
        <Avatar.Image {...props} source={{ uri: APP_URL + logo }} />
      )}
      onPress={() => {
        navigation.navigate('Posts', { ...group })
      }}
    />
  )
}

export default GroupPreview
