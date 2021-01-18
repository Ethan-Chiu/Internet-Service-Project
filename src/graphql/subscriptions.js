import { gql } from 'apollo-boost'

export const POSTS_SUBSCRIPTION = gql`
  subscription{
    subscribeName{
      mutation
      data{
        name
        body
      }
    }
  }
`
