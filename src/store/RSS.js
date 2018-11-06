import mirror, { actions } from 'mirrorx'

const addUrl = (state, { url, tag }) => {
  const feedExists = state.rss.some(feed => {
    return feed.url === url && feed.tag === tag
  })
  if (feedExists) return state

  return {
    ...state,
    rss: [...state.rss, { url, tag }]
  }
}

const removeUrl = (state, { url, tag }) => {
  const rss = state.rss.filter(feed => {
    return !(feed.url === url && feed.tag === tag)
  })
  return {
    ...state,
    rss
  }
}

mirror.model({
  name: 'urls',
  initialState: {
    rss: [
      {
        url: 'http://feeds.arstechnica.com/arstechnica/gaming',
        tag: 'Ars Technica'
      },
      {
        url: 'https://xkcd.com/rss.xml',
        tag: 'XKCD'
      },
      {
        url: 'https://www.mmo-champion.com/external.php?do=rss&type=newcontent&sectionid=1&days=120&count=5',
        tag: 'MMO Champion'
      }
    ]
  },
  reducers: {
    addUrl,
    removeUrl
  }
})
