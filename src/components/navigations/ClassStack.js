import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import StudentWallScreen from '../../screens/StudentWallScreen'
import TeacherWallScreen from '../../screens/TeacherWallScreen'
import ClassScreen from '../../screens/ClassScreen'
import LikesScreen from '../../screens/Groups/LikesScreen'
import SecretCommentsScreen from '../../screens/Groups/SecretCommentsScreen'
import ProfileScreen from '../../screens/ProfileScreen'
import { useAuth } from '../../contexts/AuthContext'
import { semesterYearToSemester } from '../../utils/index'

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
            title: `${user.profile.program}-${semesterYearToSemester(
              user.profile.semester.trim()
            )}${user.profile.section} (${user.profile.session})`,
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
      <Stack.Screen name="Class" component={ClassScreen} />
      <Stack.Screen name="Likes" component={LikesScreen} />
      <Stack.Screen
        name="SecretComments"
        component={SecretCommentsScreen}
        options={{
          title: 'Comments',
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
        }}
      />
    </Stack.Navigator>
  )
}

export default WallStack
