import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AntDesign, MaterialIcons, Octicons } from '@expo/vector-icons'
import HomeStack from './HomeStack'
import GroupsStack from './GroupsStack'
import ProfileStack from './UserStack'
import NotificationsScreen from '../../screens/NotificationsScreen'

const Tab = createBottomTabNavigator()

const BottomTabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: 'teal',
        inactiveTintColor: '#000',
        showLabel: false,
        showIcon: true,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: props => <AntDesign name="home" {...props} />,
        }}
      />
      <Tab.Screen
        name="Groups"
        component={GroupsStack}
        options={{
          tabBarIcon: props => <MaterialIcons name="group" {...props} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={ProfileStack}
        options={{
          tabBarIcon: props => <Octicons name="settings" {...props} />,
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          tabBarBadge: 2,
          tabBarIcon: props => <AntDesign name="bells" {...props} />,
        }}
      />
    </Tab.Navigator>
  )
}

export default BottomTabs
