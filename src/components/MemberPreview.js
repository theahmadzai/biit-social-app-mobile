import React from 'react'
import { List, Avatar } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { APP_URL } from '../constants'
import { profileName } from '../utils'

const MemberPreview = user => {
  const navigation = useNavigation()

  return (
    <List.Item
      title={profileName(user.profile)}
      left={props => (
        <Avatar.Image {...props} source={{ uri: APP_URL + user.image }} />
      )}
      onPress={() => {
        navigation.navigate('Profile', user)
      }}
    />
  )
}

export default MemberPreview
