import { gql } from 'apollo-boost'

export const DELETE_POST_MUTATION = gql`
  mutation deletePost(
    $name: String!
  ) {
    deletePost(
      data: {
        name: $name
      }
    ) {
      name
      body
    }
  }
`