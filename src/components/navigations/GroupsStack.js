import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Text, View, TouchableOpacity } from 'react-native'
import { Avatar, Menu, Divider } from 'react-native-paper'
import { Fontisto } from '@expo/vector-icons'
import GroupsScreen from '../../screens/Group/GroupsScreen'
import GroupScreen from '../../screens/Group/GroupScreen'
import MembersScreen from '../../screens/Group/MembersScreen'
import CreatePostScreen from '../../screens/CreatePostScreen'
import { APP_URL } from '../../constants'

const Stack = createStackNavigator()

const GroupsStack = () => {
  const [visible, setVisible] = React.useState(false)

  const openMenu = () => setVisible(true)

  const closeMenu = () => setVisible(false)

  return (
    <Stack.Navigator>
      <Stack.Screen name="Groups" component={GroupsScreen} />
      <Stack.Screen name="Members" component={MembersScreen} />
      <Stack.Screen
        name="Group"
        component={GroupScreen}
        options={({ navigation, route }) => ({
          headerTitle: (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Avatar.Image
                size={40}
                source={{ uri: APP_URL + route.params.logo }}
              />
              <View style={{ paddingLeft: 10 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                  {route.params.name}
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
                onPress={() => {
                  navigation.navigate('Members', {
                    groupId: route.params.id,
                  })
                }}
                title="Members"
              />
              <Menu.Item onPress={() => {}} title="Mute notifications" />
              <Divider />
              <Menu.Item onPress={() => {}} title="Exit group" />
            </Menu>
          ),
        })}
      />
      <Stack.Screen name="Post" component={CreatePostScreen} />
    </Stack.Navigator>
  )
}

export default GroupsStack
