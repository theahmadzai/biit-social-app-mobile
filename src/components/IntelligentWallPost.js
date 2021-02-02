import React, { useState } from 'react'
import {
  Form,
  Button,
  Toast,
  Item,
  Icon,
  Picker,
  Text,
  Input,
} from 'native-base'
import { gql, useMutation } from '@apollo/client'
import * as DocumentPicker from 'expo-document-picker'
import mime from 'react-native-mime-types'
import { ReactNativeFile } from 'apollo-upload-client'
import Loading from '../components/Loading'

const IntelligentWallPost = () => {
  const [file, setFile] = useState('')
  const [type, setType] = useState('DATESHEET')

  const [intelligentPost, { loading }] = useMutation(
    gql`
      mutation CreateIntelligentPost($input: IntelligentPostInput!) {
        intelligentPost(input: $input)
      }
    `,
    {
      onCompleted({ intelligentPost }) {
        Toast.show({
          text: intelligentPost,
          duration: 3000,
          type: 'success',
        })
      },
      onError(err) {
        Toast.show({
          text: err.message,
          duration: 3000,
          type: 'danger',
        })
      },
    }
  )

  const pickFileAction = async () => {
    const file = await DocumentPicker.getDocumentAsync({ type: '*/*' })

    if (file.type !== 'cancel') {
      const type = mime.lookup(file.uri) || 'image'
      setFile({ uri: file.uri, type, name: file.name })
    }
  }

  const createIntelligentPost = () => {
    intelligentPost({
      variables: { input: { type, file: new ReactNativeFile(file) } },
    })
  }

  if (loading) return <Loading />

  return (
    <Form style={{ padding: 10 }}>
      <Item regular style={{ marginBottom: 10 }} onPress={pickFileAction}>
        <Icon name="md-document" />
        <Input placeholder="Pick excel file..." value={file.name} disabled />
      </Item>
      <Item regular style={{ marginBottom: 10 }}>
        <Picker
          note
          mode="dropdown"
          selectedValue={type}
          onValueChange={setType}
        >
          <Picker.Item label="Date Sheet" value="DATESHEET" />
          <Picker.Item label="Time Table" value="TIMETABLE" />
        </Picker>
      </Item>
      <Button dark onPress={createIntelligentPost}>
        <Text>Create Post</Text>
      </Button>
    </Form>
  )
}

export default IntelligentWallPost
