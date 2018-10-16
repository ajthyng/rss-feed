const { ApolloServer, gql } = require('apollo-server')
const Parser = require('rss-parser')

const typeDefs = gql`
  # RSS Feed Reader

  type Item {
    title: String
    link: String
    description: String
    guid: String
    date: String
    creator: String
  }
  
  type RSS {
    items: [Item]
  }

  type Query {
    feed(url: String): RSS
  }
`

/*
{
  title: 'Rock Wall',
  link: 'https://xkcd.com/2058/',
  pubDate: 'Fri, 12 Oct 2018 04:00:00 -0000',
  content: '<img src="https://imgs.xkcd.com/comics/rock_wall.png" title="I don\'t trust mantle/core geologists because I suspect that, if they ever get a chance to peel away the Earth\'s crust, they\'ll do it in a heartbeat." alt="I don\'t trust mantle/core geologists because I suspect that, if they ever get a chance to peel away the Earth\'s crust, they\'ll do it in a heartbeat." />',
  contentSnippet: '',
  guid: 'https://xkcd.com/2058/',
  isoDate: '2018-10-12T04:00:00.000Z'
}
*/

const resolvers = {
  Query: {
    feed (root, args, context, info) {
      if (!args.url) return []
      return new Parser().parseURL(args.url)
    }
  },
  RSS: {
    items (parent, args, context, info) {
      console.log(parent.items[0])
      return parent.items
    }
  },
  Item: {
    title: ({ title = null }) => title,
    link: ({ link = null }) => link,
    description: ({ content = null }) => content,
    guid: ({ guid }) => guid,
    date: ({ isoDate = null }) => isoDate,
    creator: ({ creator = null }) => creator
  }
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
  console.log(`Server listening at ${url}`)
})
