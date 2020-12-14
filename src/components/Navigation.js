import React, { useState } from 'react'
import { BottomNavigation } from 'react-native-paper'
import HomeScreen from '../screens/HomeScreen'
import PostScreen from '../screens/PostScreen'
import ProfileScreen from '../screens/ProfileScreen'
import NotificationsScreen from '../screens/NotificationsScreen'
import GroupsScreen from '../screens/GroupsScreen'

const Navigation = () => {
  const [index, setIndex] = useState(0)
  const [routes] = useState([
    { key: 'home', title: 'Home', icon: 'home' },
    { key: 'post', title: 'Post', icon: 'plus' },
    { key: 'profile', title: 'Profile', icon: 'settings' },
    { key: 'notifications', title: 'Notifications', icon: 'bell' },
    { key: 'groups', title: 'Groups', icon: 'group' },
  ])

  const renderScene = BottomNavigation.SceneMap({
    home: HomeScreen,
    post: PostScreen,
    profile: ProfileScreen,
    notifications: NotificationsScreen,
    groups: GroupsScreen,
  })

  return (
    <BottomNavigation
      inactiveColor="#000"
      activeColor="teal"
      barStyle={{ backgroundColor: '#fff' }}
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  )
}

export default Navigation
