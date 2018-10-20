import ApolloClient from 'apollo-boost'
import gql from 'graphql-tag'
import { observable } from 'mobx'
import { from, fromPromise } from 'most'

const client = new ApolloClient({
  uri: 'http://localhost:4000/'
})

class RssFeedStore {
  @observable rssItems = []

  rss = (url, tag = 'NO TAG') => {
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

    return client.query({
      query: rssQuery,
      errorPolicy: 'ignore',
      fetchPolicy: 'no-cache'
    }).then(({ data }) => ({ data, tag }))
  }

  getRss = (feeds = []) => {
    fromPromise(
      from(feeds)
        .map(({ url, tag }) => this.rss(url, tag))
        .flatMap(rss => fromPromise(rss))
        .map(({ data, tag }) => data.feed.items.map(item => ({ ...item, tag })))
        .flatMap(items => from(items))
        .reduce((items, item) => [...items, item], [])
    ).subscribe({
      next: rssItems => { this.rssItems = rssItems }
    })
  }
}

const ObservableRSSFeeds = new RssFeedStore()

export default ObservableRSSFeeds
