import { gql } from 'apollo-boost'

export const CREATE_POST_MUTATION = gql`
  mutation createPost(
    $name: String!
    $body: String!
  ) {
    createPost(
      data: {
        name: $name
        body: $body
      }
    ) {
      name
      body
    }
  }
`
