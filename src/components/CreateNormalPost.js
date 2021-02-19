import React, { useState } from 'react'
import { FlatList } from 'react-native'
import { Text, Body, ListItem, CheckBox } from 'native-base'
import CreateWallPostForm from '../components/CreateWallPostForm'

const classes = [
  'ALL',
  // 'BSCS-1A',
  // 'BSCS-1B',
  // 'BSCS-2A',
  // 'BSCS-2B',
  // 'BSCS-3A',
  // 'BSCS-3B',
  // 'BSCS-4A',
  // 'BSCS-4B',
  // 'BSCS-5A',
  // 'BSCS-5B',
  // 'BSCS-6A',
  // 'BSCS-6B',
  // 'BSCS-7A',
  // 'BSCS-7B',
  // 'BSCS-8A',
  // 'BSCS-8B',
]

const CreateNormalPost = () => {
  const [classSelections, setClassSelections] = useState(
    classes.map(c => [c, false])
  )

  const selectClass = i => {
    classSelections[i][1] = !classSelections[i][1]
    setClassSelections([...classSelections])
  }

  return (
    <FlatList
      ListHeaderComponent={<CreateWallPostForm />}
      data={classSelections}
      keyExtractor={([c]) => c}
      renderItem={({ item: [c, isChecked], index }) => (
        <ListItem onPress={() => selectClass(index)}>
          <CheckBox checked={true} />
          <Body>
            <Text>{c.toUpperCase()}</Text>
          </Body>
        </ListItem>
      )}
    />
  )
}

export default CreateNormalPost
