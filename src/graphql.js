import { gql } from '@apollo/client'

export const USER_FIELDS = gql`
  fragment UserFields on User {
    id
    username
    image
    role
    profile {
      firstName
      middleName
      lastName
    }
  }
`

export const GROUP_FIELDS = gql`
  fragment GroupFields on Group {
    id
    name
    description
    image
  }
`

export const POST_FIELDS = gql`
  fragment PostFields on Post {
    id
    text
    createdAt
    media {
      id
      filename
    }
    likesCount
    commentsCount
  }
`

export const LIKE_FIELDS = gql`
  fragment LikeFields on Like {
    id
    createdAt
  }
`

export const COMMENT_FIELDS = gql`
  fragment CommentFields on Comment {
    id
    content
    createdAt
  }
`

export const LOGIN = gql`
  mutation Login($credentials: AuthInput!) {
    login(input: $credentials) {
      token
      user {
        ...UserFields
      }
    }
  }
  ${USER_FIELDS}
`

export const GROUP_USERS = gql`
  query GroupUsers($id: ID!) {
    groupUsers(id: $id) {
      ...UserFields
    }
  }
  ${USER_FIELDS}
`

export const ADD_GROUP_USER = gql`
  mutation AddGroupUser($input: GroupUserInput!) {
    addGroupUser(input: $input) {
      ...UserFields
    }
  }
  ${USER_FIELDS}
`

export const REMOVE_GROUP_USER = gql`
  mutation RemoveGroupUser($input: GroupUserInput!) {
    removeGroupUser(input: $input) {
      ...UserFields
    }
  }
  ${USER_FIELDS}
`

export const SEARCH_USERS = gql`
  query SearchUsers($input: SearchUsersInput!) {
    searchUsers(input: $input) {
      ...UserFields
    }
  }
  ${USER_FIELDS}
`

export const USER_GROUPS = gql`
  query UserGroups($id: ID!) {
    userGroups(id: $id) {
      ...GroupFields
    }
  }
  ${GROUP_FIELDS}
`

export const CREATE_GROUP = gql`
  mutation CreateGroup($input: GroupInput!) {
    createGroup(input: $input) {
      ...GroupFields
    }
  }
  ${GROUP_FIELDS}
`

export const GROUP_POSTS = gql`
  query GroupPosts($id: ID!) {
    groupPosts(id: $id) {
      ...PostFields
      user {
        ...UserFields
      }
    }
  }
  ${POST_FIELDS}
  ${USER_FIELDS}
`

export const CREATE_GROUP_POST = gql`
  mutation CreateGroupPost($input: PostInput!) {
    createGroupPost(input: $input) {
      ...PostFields
      user {
        ...UserFields
      }
    }
  }
  ${POST_FIELDS}
  ${USER_FIELDS}
`

export const POST_LIKES = gql`
  query PostLikes($id: ID!) {
    postLikes(id: $id) {
      ...LikeFields
      user {
        ...UserFields
      }
    }
  }
  ${LIKE_FIELDS}
  ${USER_FIELDS}
`

export const TOGGLE_POST_LIKE = gql`
  mutation togglePostLike($id: ID!) {
    togglePostLike(id: $id) {
      ...LikeFields
      user {
        ...UserFields
      }
    }
  }
  ${LIKE_FIELDS}
  ${USER_FIELDS}
`

export const POST_COMMENTS = gql`
  query PostComments($id: ID!) {
    postComments(id: $id) {
      ...CommentFields
      user {
        ...UserFields
      }
    }
  }
  ${COMMENT_FIELDS}
  ${USER_FIELDS}
`

export const CREATE_POST_COMMENT = gql`
  mutation CreatePostComment($input: CommentInput!) {
    createPostComment(input: $input) {
      ...CommentFields
      user {
        ...UserFields
      }
    }
  }
  ${COMMENT_FIELDS}
  ${USER_FIELDS}
`
