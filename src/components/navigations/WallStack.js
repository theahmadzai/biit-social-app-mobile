import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import StudentWallScreen from '../../screens/StudentWallScreen'
import TeacherWallScreen from '../../screens/TeacherWallScreen'
import { useAuth } from '../../contexts/AuthContext'

const Stack = createStackNavigator()

const WallStack = () => {
  const { user } = useAuth()

  return (
    <Stack.Navigator>
      {user.role === 'STUDENT' ? (
        <Stack.Screen
          name="StudentWall"
          component={StudentWallScreen}
          options={{
            title: `${user.profile.program}-${user.profile.semester}${user.profile.section} (${user.profile.session})`,
          }}
        />
      ) : (
        <Stack.Screen
          name="TeacherWall"
          component={TeacherWallScreen}
          options={{
            title: 'Classes',
          }}
        />
      )}
    </Stack.Navigator>
  )
}

export default WallStack
