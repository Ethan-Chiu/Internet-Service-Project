import { gql } from 'apollo-boost'

export const GET_POST = gql`
  query getPosts(
    $x: Int!
    $y: Int!
    $s: Int
    ){
    getPosts(locale: {
      x: $x
      y: $y
      s: $s
    }){
      author
      location
      {
        x
        y
        s
      }
      type
      title
      text
      picture
      tags
      likes
      comments
      {
        user
        text
      }
      time

    }
  }
`