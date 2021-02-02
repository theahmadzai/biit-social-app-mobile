import React from 'react'
import { View, Text } from 'react-native'
import { useAuth } from '../contexts/AuthContext'

const TeacherWall = () => {
  const { user } = useAuth()

  return (
    <View>
      <Text>
        Teacher Wall: {user.username} - {user.role}
      </Text>
    </View>
  )
}

export default TeacherWall
