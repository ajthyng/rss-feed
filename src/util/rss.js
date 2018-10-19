import ApolloClient from 'apollo-boost'
import gql from 'graphql-tag'
import { from, fromPromise } from 'most'

const client = new ApolloClient({
  uri: 'http://localhost:4000/'
})

function rss (url, tag = 'NO TAG') {
  const rssQuery = gql`{
    feed(url: "${url}", tag: "${tag}") {
      items {
        title
        link
        description
        date
        guid
      }
    }
  }`
  // throw new Error('err')
  return client.query({
    query: rssQuery,
    errorPolicy: 'ignore',
    fetchPolicy: 'no-cache'
  }).then(({ data }) => ({ data, tag }))
}

export function getRss (feeds = []) {
  return fromPromise(
    from(feeds)
      .map(({ url, tag }) => rss(url, tag))
      .flatMap(rss => fromPromise(rss))
      .map(({ data, tag }) => data.feed.items.map(item => ({ ...item, tag })))
      .flatMap(items => from(items))
      .reduce((items, item) => [...items, item], [])
  )
}
