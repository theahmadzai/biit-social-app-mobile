import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AntDesign, Entypo, Octicons } from '@expo/vector-icons'
import HomeStackNavigator from './HomeStackNavigator'
import GroupsStackNavigator from './GroupsStackNavigator'
import PostScreen from '../screens/PostScreen'
import ProfileScreen from '../screens/ProfileScreen'
import NotificationsScreen from '../screens/NotificationsScreen'

const Tab = createBottomTabNavigator()

const BottomTabNavigator = () => (
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
      component={HomeStackNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <AntDesign name="home" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Groups"
      component={GroupsStackNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <AntDesign name="group" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Post"
      component={PostScreen}
      options={{
        tabBarIcon: props => <Entypo name="new-message" {...props} />,
      }}
    />
    <Tab.Screen
      name="Settings"
      component={ProfileScreen}
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

export default BottomTabNavigator
