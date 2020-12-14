import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import Post from '../components/Post'

const posts = [
  {
    title: 'Some announcement',
    content:
      'Enim anim aute et sunt. Aliqua mollit incididunt ullamco eu excepteur dolore occaecat occaecat. Adipisicing deserunt consequat sunt aute ea occaecat nostrud velit. Fugiat esse consectetur dolor dolore eu. Ea mollit veniam commodo do.',
    image: 'https://picsum.photos/700',
  },
  {
    title: 'Hello World',
    content:
      'Enim anim aute et sunt. Aliqua mollit incididunt ullamco eu excepteur dolore occaecat occaecat. Adipisicing deserunt consequat sunt aute ea occaecat nostrud velit. Fugiat esse consectetur dolor dolore eu. Ea mollit veniam commodo do.',
    image: 'https://picsum.photos/700',
  },
  {
    title: 'Welcome to BIIT Social App',
    content:
      'Enim anim aute et sunt. Aliqua mollit incididunt ullamco eu excepteur dolore occaecat occaecat. Adipisicing deserunt consequat sunt aute ea occaecat nostrud velit. Fugiat esse consectetur dolor dolore eu. Ea mollit veniam commodo do.',
    image: 'https://picsum.photos/700',
  },
]

const HomeScreen = () => {
  return (
    <FlatList
      style={styles.list}
      data={posts}
      keyExtractor={({ title }) => title}
      renderItem={({ item }) => <Post {...item} />}
    />
  )
}

const styles = StyleSheet.create({
  list: {
    padding: 10,
  },
})

export default HomeScreen
