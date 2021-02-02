import React from 'react'
import { Container, Tabs, Tab } from 'native-base'
import WallPost from '../components/WallPost'
import IntelligentWallPost from '../components/IntelligentWallPost'

const CreateWallPostScreen = () => {
  return (
    <Container>
      <Tabs tabBarInactiveTextColor="#fff">
        <Tab
          activeTabStyle={{ backgroundColor: '#000' }}
          tabStyle={{ backgroundColor: '#222' }}
          heading="Normal Post"
        >
          <WallPost />
        </Tab>
        <Tab
          activeTabStyle={{ backgroundColor: '#000' }}
          tabStyle={{ backgroundColor: '#222' }}
          heading="Intelligent Post"
        >
          <IntelligentWallPost />
        </Tab>
      </Tabs>
    </Container>
  )
}

export default CreateWallPostScreen
