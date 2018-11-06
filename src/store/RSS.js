import mirror from 'mirrorx'

const addFeed = (state, { url, tag }) => {
  const feedExists = state.rss.some(feed => {
    return feed.url === url && feed.tag === tag
  })
  if (feedExists) return state

  return {
    ...state,
    rss: [...state.rss, { url, tag }]
  }
}

const removeFeed = (state, { url, tag }) => {
  const rss = state.rss.filter(feed => {
    return !(feed.url === url && feed.tag === tag)
  })
  return {
    ...state,
    rss
  }
}

mirror.hook((action, getState) => {
  const rssUrls = JSON.stringify(getState().urls.rss || [])
  localStorage.setItem('rssUrls', rssUrls)
})

mirror.model({
  name: 'urls',
  initialState: {
    rss: JSON.parse(localStorage.getItem('rssUrls') || '[]')
  },
  reducers: {
    addFeed,
    removeFeed
  }
})
