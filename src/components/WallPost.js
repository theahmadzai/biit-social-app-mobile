import React, { useState } from 'react'
import { FlatList, Image } from 'react-native'
import {
  Form,
  Item,
  Input,
  Button,
  Text,
  Icon,
  Body,
  ListItem,
  CheckBox,
} from 'native-base'
import * as ImagePicker from 'expo-image-picker'
import mime from 'react-native-mime-types'

const WallPost = () => {
  const [text, setText] = useState('')
  const [files, setFiles] = useState([])

  const pickImageAction = async () => {
    const { uri, cancelled } = await ImagePicker.launchImageLibraryAsync({
      mediaType: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    })

    if (!cancelled) {
      const type = mime.lookup(uri) || 'image'
      const name = `file-${files.length}.${mime.extension(type)}`

      setFiles([...files, { uri, type, name }])
    }
  }

  const createWallPostAction = () => {}

  return (
    <Form style={{ padding: 10 }}>
      <FlatList
        horizontal
        data={files}
        keyExtractor={({ uri }) => uri}
        renderItem={({ item: { uri } }) => (
          <Image
            source={{ uri }}
            style={{
              borderWidth: 1,
              borderColor: '#999999',
              height: 70,
              width: 70,
              marginBottom: 10,
              marginRight: 10,
            }}
          />
        )}
      />
      <Item regular style={{ marginBottom: 10 }}>
        <Input
          placeholder="Write something..."
          value={text}
          onChangeText={setText}
        />
        <Icon name="image" onPress={pickImageAction} />
        <Icon name="send" onPress={createWallPostAction} />
      </Item>
      <ListItem>
        <CheckBox checked={true} />
        <Body>
          <Text>ALL</Text>
        </Body>
      </ListItem>
      <ListItem>
        <CheckBox checked={true} />
        <Body>
          <Text>BSCS</Text>
        </Body>
      </ListItem>
      <ListItem>
        <CheckBox checked={true} />
        <Body>
          <Text>BSIT</Text>
        </Body>
      </ListItem>
      <ListItem>
        <CheckBox checked={true} />
        <Body>
          <Text>BSCS-1</Text>
        </Body>
      </ListItem>
      <ListItem>
        <CheckBox checked={false} />
        <Body>
          <Text>BSIT-1</Text>
        </Body>
      </ListItem>
      <ListItem>
        <CheckBox checked={false} />
        <Body>
          <Text>BSCS-2</Text>
        </Body>
      </ListItem>
      <ListItem>
        <CheckBox checked={false} />
        <Body>
          <Text>BSIT-2</Text>
        </Body>
      </ListItem>
      <ListItem>
        <CheckBox checked={false} />
        <Body>
          <Text>BSCS-3</Text>
        </Body>
      </ListItem>
      <ListItem>
        <CheckBox checked={false} />
        <Body>
          <Text>BSIT-3</Text>
        </Body>
      </ListItem>
      <Button dark onPress={createWallPostAction}>
        <Text>Create Post</Text>
      </Button>
    </Form>
  )
}

export default WallPost
