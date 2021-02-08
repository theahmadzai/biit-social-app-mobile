import React from 'react'
import { Container, Tabs, Tab } from 'native-base'
import CreateNormalPost from '../components/CreateNormalPost'
import CreateIntelligentPost from '../components/CreateIntelligentPost'

const CreateWallPostScreen = () => {
  return (
    <Container>
      <Tabs tabBarInactiveTextColor="#fff">
        <Tab
          activeTabStyle={{ backgroundColor: '#009e50' }}
          tabStyle={{ backgroundColor: '#008e50' }}
          heading="Normal Post"
        >
          <CreateNormalPost />
        </Tab>
        <Tab
          activeTabStyle={{ backgroundColor: '#009e50' }}
          tabStyle={{ backgroundColor: '#008e50' }}
          heading="Intelligent Post"
        >
          <CreateIntelligentPost />
        </Tab>
      </Tabs>
    </Container>
  )
}

export default CreateWallPostScreen
