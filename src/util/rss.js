import ApolloClient from 'apollo-boost'
import gql from 'graphql-tag'
import { from, fromPromise } from 'most'
import dayjs from 'dayjs'

const client = new ApolloClient({
  uri: 'http://localhost/api/'
})

const byDate = (a, b) => {
  const aDate = dayjs(a.date)
  const bDate = dayjs(b.date)

  return bDate.valueOf() - aDate.valueOf()
}

class RssFeedStore {
  rssItems = []
  feeds = [
    { url: 'http://feeds.arstechnica.com/arstechnica/gaming', tag: 'Ars Technica' },
    { url: 'https://xkcd.com/rss.xml', tag: 'XKCD' },
    { url: 'https://news.ycombinator.com/rss', tag: 'Y Combinator' },
    { url: 'https://www.mmo-champion.com/external.php?do=rss&type=newcontent&sectionid=1&days=120&count=5', tag: 'MMO Champion' }
  ]

  addFeed = (url, tag) => {
    this.feeds.push({ url, tag })
  }

  removeFeed = (url) => {

  }

  getRssFeed (url, tag = 'NO TAG') {
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

  rssFeeds () {
    fromPromise(
      from(this.feeds)
        .map(({ url, tag }) => this.getRssFeed(url, tag))
        .flatMap(rss => fromPromise(rss))
        .tap(console.log)
        .map(({ data, tag }) => data.feed.items.map(item => ({ ...item, tag })))
        .flatMap(items => from(items))
        .reduce((items, item) => [...items, item], [])
    ).subscribe({
      next: rssItems => { this.rssItems = rssItems.sort(byDate) }
    })
  }
}

const ObservableRSSFeeds = new RssFeedStore()

export default ObservableRSSFeeds
