import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { Feather } from '@expo/vector-icons'
import HomeScreen from '../../screens/HomeScreen'
import CreateWallPostScreen from '../../screens/CreateWallPostScreen'
import DatesheetScreen from '../../screens/DatesheetScreen'
import TimetableScreen from '../../screens/TimetableScreen'
import LikesScreen from '../../screens/Groups/LikesScreen'
import CommentsScreen from '../../screens/Groups/CommentsScreen'
import ProfileScreen from '../../screens/ProfileScreen'
import { useAuth } from '../../contexts/AuthContext'

const Stack = createStackNavigator()

const HomeStack = () => {
  const { user } = useAuth()

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation: { navigate } }) => ({
          title: 'BIIT',
          headerRight: () =>
            user.role === 'STUDENT' ? (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  flexDirection: 'row',
                }}
              >
                <TouchableOpacity
                  style={{ marginRight: 20 }}
                  onPress={() => navigate('Datesheet')}
                >
                  <Feather name="clipboard" size={18} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ marginRight: 20 }}
                  onPress={() => navigate('Timetable')}
                >
                  <Feather name="calendar" size={18} />
                </TouchableOpacity>
              </View>
            ) : null,
        })}
      />
      <Stack.Screen
        name="CreateWallPost"
        component={CreateWallPostScreen}
        options={{
          title: 'Create Wall Post',
        }}
      />
      <Stack.Screen name="Datesheet" component={DatesheetScreen} />
      <Stack.Screen name="Timetable" component={TimetableScreen} />
      <Stack.Screen name="Likes" component={LikesScreen} />
      <Stack.Screen name="Comments" component={CommentsScreen} />
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

export default HomeStack
