import { gql } from 'apollo-boost'

export const POSTS_QUERY = gql`
  query{
    names{
      name
      body
    }
  }
`