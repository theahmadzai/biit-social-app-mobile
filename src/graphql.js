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

      ... on StudentProfile {
        session
        program
        section
        semester
      }

      ... on EmployeeProfile {
        designation
        status
        phone
        email
      }
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
    secret
    tags
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
    secret
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

export const EXIT_GROUP = gql`
  mutation ExitGroup($id: ID!) {
    exitGroup(id: $id) {
      ...GroupFields
    }
  }
  ${GROUP_FIELDS}
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
  query UserGroups {
    userGroups {
      ...GroupFields
    }
  }
  ${GROUP_FIELDS}
`

export const USER_CLASS_POSTS = gql`
  query UserClassPosts {
    userClassPosts {
      ...PostFields
      user {
        ...UserFields
      }
    }
  }
  ${POST_FIELDS}
  ${USER_FIELDS}
`

export const CREATE_CLASS_POST = gql`
  mutation CreateClassPost($input: ClassPostInput!) {
    createClassPost(input: $input) {
      ...PostFields
      user {
        ...UserFields
      }
    }
  }
  ${POST_FIELDS}
  ${USER_FIELDS}
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

export const CLASS_POSTS = gql`
  query ClassPosts($id: ID!) {
    classPosts(id: $id) {
      ...PostFields
      user {
        ...UserFields
      }
    }
  }
  ${POST_FIELDS}
  ${USER_FIELDS}
`

export const WALL_POSTS = gql`
  query wallPosts {
    wallPosts {
      ...PostFields
      user {
        ...UserFields
      }
    }
  }
  ${POST_FIELDS}
  ${USER_FIELDS}
`
export const CREATE_WALL_POST = gql`
  mutation CreateWallPost($input: WallPostInput!) {
    createWallPost(input: $input) {
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

export const TEACHER_CLASSES = gql`
  query TeacherClasses {
    teacherClasses {
      id
      name
      createdAt
      updatedAt
    }
  }
`
