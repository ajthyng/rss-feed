import ApolloClient from 'apollo-boost'
import gql from 'graphql-tag'

const client = new ApolloClient({
  uri: 'http://localhost:4000/'
})

export function rss (url, tag = 'NO TAG') {
  const rssQuery = gql`{
    feed(url: "${url}", tag: "${tag}") {
      items {
        title
        link
        description
        date
        guid
        tag
      }
    }
  }`

  return client.query({
    query: rssQuery
  })
}
