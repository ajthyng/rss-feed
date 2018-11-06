import mirror, { actions } from 'mirrorx'
import { getRssFeed } from '../util/rss'
import { from, fromPromise } from 'most'

const requestFeeds = state => ({
  ...state,
  loading: true,
  error: null
})

const feedsSuccess = (state, feeds) => ({
  ...state,
  loading: false,
  error: null,
  feeds
})

const feedsFailure = (state, error) => ({
  ...state,
  loading: false,
  error
})

mirror.model({
  name: 'rss',
  initialState: {
    loading: false,
    error: null,
    feeds: JSON.parse(localStorage.getItem('feeds') || '[]')
  },
  reducers: {
    requestFeeds,
    feedsSuccess,
    feedsFailure
  },
  effects: {
    async getRssFeeds (urls) {
      actions.rss.requestFeeds()
      fromPromise(
        from(urls)
          .map(({ url, tag }) => getRssFeed(url, tag))
          .flatMap(rss => fromPromise(rss))
          .map(({ data, tag }) =>
            data.feed.items.map(item => ({ ...item, tag }))
          )
          .flatMap(items => from(items))
          .reduce((items, item) => [...items, item], [])
      ).subscribe({
        next: data => actions.rss.feedsSuccess(data),
        error: err => actions.rss.feedsFailure(err)
      })
    }
  }
})
