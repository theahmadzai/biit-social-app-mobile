import React from 'react'
import { Container, Icon, Fab } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import StudentWall from '../components/StudentWall'
import TeacherWall from '../components/TeacherWall'
import { useAuth } from '../contexts/AuthContext'

const HomeScreen = () => {
  const { navigate } = useNavigation()
  const { user } = useAuth()

  return (
    <Container>
      {user.role === 'STUDENT' ? <StudentWall /> : <TeacherWall />}
      {user.role === 'ADMIN' ? (
        <Fab
          position="bottomRight"
          style={{ backgroundColor: 'white' }}
          onPress={() => navigate('CreateWallPost')}
        >
          <Icon name="md-create" style={{ color: 'black' }} />
        </Fab>
      ) : null}
    </Container>
  )
}

export default HomeScreen
