import React, { useState } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { Thumbnail } from 'native-base'
import { Menu, Divider } from 'react-native-paper'
import { createStackNavigator } from '@react-navigation/stack'
import { Feather } from '@expo/vector-icons'
import GroupsScreen from '../../screens/Groups/GroupsScreen'
import PostsScreen from '../../screens/Groups/PostsScreen'
import MembersScreen from '../../screens/Groups/MembersScreen'
import LikesScreen from '../../screens/Groups/LikesScreen'
import CommentsScreen from '../../screens/Groups/CommentsScreen'
import CreateGroupScreen from '../../screens/Groups/CreateGroupScreen'
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
          navigation: { navigate },
          route: {
            params: { group },
          },
        }) => ({
          headerTitle: (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Thumbnail small source={{ uri: APP_URL + group.image }} />
              <View style={{ marginLeft: 10 }}>
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
                  <Feather
                    name="more-vertical"
                    size={18}
                    style={{ padding: 20 }}
                  />
                </TouchableOpacity>
              }
            >
              <Menu.Item
                title="Members"
                onPress={() => navigate('Members', { group })}
              />
              <Menu.Item
                title="Add members"
                onPress={() => navigate('AddMembers', { group })}
              />
              <Divider />
              <Menu.Item onPress={() => {}} title="Exit group" />
            </Menu>
          ),
        })}
      />
      <Stack.Screen name="Members" component={MembersScreen} />
      <Stack.Screen name="Likes" component={LikesScreen} />
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
    </Stack.Navigator>
  )
}

export default GroupsStack
