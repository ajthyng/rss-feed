import ApolloClient from 'apollo-boost'
import gql from 'graphql-tag'
import { from, of } from 'rxjs'
import { map, concatMap, onErrorResumeNext, mergeMap, scan, reduce } from 'rxjs/operators'

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
  return client.query({ query: rssQuery })
}

export function getRss (feeds = []) {
  return from(feeds).pipe(
    mergeMap(({ url: feed, tag }) => {
      return of(rss(feed)).pipe(
        onErrorResumeNext(),
        concatMap(data => data),
        map(({ data }) => data.feed),
        map(({ items }) => ({ items, tag })),
        scan((accum, feed) => {
          const items = feed.items.map(item => ({ ...item, tag: feed.tag }))
          return [...accum, ...items]
        }, [])
      )
    }),
    reduce((accum, feed) => [...accum, ...feed], [])
  )
}
