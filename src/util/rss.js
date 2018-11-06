import ApolloClient from 'apollo-boost'
import gql from 'graphql-tag'
import dayjs from 'dayjs'

const client = new ApolloClient({
  uri: `http://${window.location.hostname}:4000/api/`
})

export function getRssFeed (url, tag = 'NO TAG') {
  const rssQuery = gql`{
      feed(url:"${url}") {
        items {
          title
          link
          description
          date
          guid
        }
      }
    }`

  return client
    .query({
      query: rssQuery,
      errorPolicy: 'ignore',
      fetchPolicy: 'no-cache'
    })
    .then(({ data }) => ({ data, tag }))
}

export function rssFeeds () {}
