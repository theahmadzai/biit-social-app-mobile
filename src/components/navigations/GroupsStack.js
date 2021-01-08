import React, { useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Text, View, TouchableOpacity } from 'react-native'
import { Avatar, Menu, Divider } from 'react-native-paper'
import { Fontisto } from '@expo/vector-icons'
import GroupsScreen from '../../screens/Groups/GroupsScreen'
import PostsScreen from '../../screens/Groups/PostsScreen'
import MembersScreen from '../../screens/Groups/MembersScreen'
import CommentsScreen from '../../screens/Groups/CommentsScreen'
import CreateGroupScreen from '../../screens/Groups/CreateGroupScreen'
import ProfileScreen from '../../screens/User/ProfileScreen'
import AddMembersScreen from '../../screens/Groups/AddMembersScreen'
import { APP_URL } from '../../constants'

const Stack = createStackNavigator()

const GroupsStack = () => {
  const [visible, setVisible] = useState(false)

  const openMenu = () => setVisible(true)

  const closeMenu = () => setVisible(false)

  return (
    <Stack.Navigator>
      <Stack.Screen name="Groups" component={GroupsScreen} />
      <Stack.Screen
        name="Posts"
        component={PostsScreen}
        options={({
          navigation,
          route: {
            params: { group },
          },
        }) => ({
          headerTitle: (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Avatar.Image size={40} source={{ uri: APP_URL + group.image }} />
              <View style={{ paddingLeft: 10 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                  {group.name}
                </Text>
              </View>
            </View>
          ),
          headerRight: () => (
            <Menu
              visible={visible}
              onDismiss={closeMenu}
              anchor={
                <TouchableOpacity onPress={openMenu}>
                  <Fontisto name="more-v-a" size={18} style={{ padding: 20 }} />
                </TouchableOpacity>
              }
            >
              <Menu.Item
                title="Members"
                onPress={() => navigation.navigate('Members', { group })}
              />
              <Menu.Item
                title="Add members"
                onPress={() => navigation.navigate('AddMembers', { group })}
              />
              <Divider />
              <Menu.Item onPress={() => {}} title="Exit group" />
            </Menu>
          ),
        })}
      />
      <Stack.Screen name="Members" component={MembersScreen} />
      <Stack.Screen name="Comments" component={CommentsScreen} />
      <Stack.Screen
        name="AddMembers"
        component={AddMembersScreen}
        options={{
          title: 'Add Members',
        }}
      />
      <Stack.Screen
        name="CreateGroup"
        component={CreateGroupScreen}
        options={{
          title: 'Create Group',
        }}
      />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  )
}

export default GroupsStack
