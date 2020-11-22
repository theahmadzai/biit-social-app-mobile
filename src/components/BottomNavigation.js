import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AntDesign, Entypo, Octicons } from '@expo/vector-icons'
import HomeScreen from '../screens/HomeScreen'
import SettingsScreen from '../screens/SettingsScreen'
import PostScreen from '../screens/PostScreen'

const Tab = createBottomTabNavigator()

const BottomNavigation = () => (
  <NavigationContainer>
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarBadge: 2,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={size} color={color} />
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
        component={SettingsScreen}
        options={{
          tabBarIcon: props => <Octicons name="settings" {...props} />,
        }}
      />
    </Tab.Navigator>
  </NavigationContainer>
)

export default BottomNavigation
