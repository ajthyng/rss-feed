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
    tag: String
  }
  
  type RSS {
    items: [Item]
  }

  type Query {
    feed(url: String, tag: String): RSS
  }
`

const resolvers = {
  Query: {
    feed (root, args, context, info) {
      if (!args.url) return []
      const tag = args.tag || null
      return new Parser().parseURL(args.url).then(({ items }) => ({ items, tag }))
    }
  },
  RSS: {
    items ({ items, tag }, args, context, info) {
      return items.map(item => ({ ...item, tag }))
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
