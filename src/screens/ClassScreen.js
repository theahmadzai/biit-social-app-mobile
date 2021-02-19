import React, { useState } from 'react'
import { Alert, RefreshControl, FlatList } from 'react-native'
import { Container, Badge, Text } from 'native-base'
import { useQuery } from '@apollo/client'
import CreateClassPostForm from '../components/CreateClassPostForm'
import { CLASS_POSTS } from '../graphql'
import SecretPostPreview from '../components/SecretPostPreview'
import Loading from '../components/Loading'

const getTags = arr => [
  ...arr
    .map(post => {
      if (post.tags !== null) {
        return post.tags.split(',')
      }
    })
    .filter(Boolean)
    .flat()
    .filter(Boolean),
]

const retUnique = (arr = []) => {
  const list = []

  arr.forEach(a => {
    if (!list.includes(a.toLowerCase())) {
      list.push(a)
    }
  })

  return list
}

const ClassScreen = ({ route }) => {
  const classId = route.params.classId
  const [tags, setTags] = useState(['#All'])
  const [tag, setTag] = useState('#All')
  const [filteredPosts, setFilteredPosts] = useState([])
  const [allPosts, setAllPosts] = useState([])
  const [loading, setLoading] = useState(true)

  const { error, refetch, networkStatus } = useQuery(CLASS_POSTS, {
    variables: { id: classId },
    onCompleted(data) {
      setAllPosts(data.classPosts)
      setFilteredPosts(data.classPosts)
      setTags(retUnique(['#All', ...getTags(data.classPosts)]))
      setLoading(false)
    },
  })

  const setTreand = treand => {
    setTag(treand)

    if (treand.toLowerCase() === '#All'.toLowerCase()) {
      setFilteredPosts([...allPosts])
      return
    }

    setFilteredPosts(
      allPosts.filter(post => {
        if (post.tags !== null) {
          return post.tags
            .split(',')
            .find(t => t.toLowerCase() === treand.toLowerCase())
        }
        return false
      })
    )
  }

  const addNewPostAndTag = data => {
    if (tag.toLowerCase() === '#All'.toLowerCase()) {
      setFilteredPosts([data, ...filteredPosts])
    }
    setAllPosts([data, ...allPosts])
    setTags(retUnique([...tags, ...getTags([data])]))
  }

  if (loading) return <Loading />
  if (error) Alert.alert(error.name, error.message)

  return (
    <Container>
      <FlatList
        ListHeaderComponent={
          <>
            <CreateClassPostForm
              addNewPostAndTag={addNewPostAndTag}
              classId={classId}
            />
            <FlatList
              style={{ padding: 10 }}
              horizontal
              data={tags}
              keyExtractor={(_, i) => i.toString()}
              renderItem={({ item }) => (
                <Badge style={{ marginRight: 10 }} success={tag === item}>
                  <Text onPress={() => setTreand(item)}>{item}</Text>
                </Badge>
              )}
            />
          </>
        }
        data={filteredPosts}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => <SecretPostPreview post={item} />}
        refreshControl={
          <RefreshControl
            onRefresh={refetch}
            refreshing={networkStatus === 4}
          />
        }
      />
    </Container>
  )
}

export default ClassScreen
