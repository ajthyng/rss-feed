import ApolloClient from 'apollo-boost'
import gql from 'graphql-tag'

const client = new ApolloClient({
  uri: 'http://192.168.1.248:4000/'
})

export function rss (url, name = 'No Tag') {
  const rssQuery = gql`{
    feed(url: "${url}") {
      items {
        title
        link
        description
        date
        guid
      }
    }
  }`

  return client.query({
    query: rssQuery
  })
}
