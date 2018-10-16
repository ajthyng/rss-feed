import React, { Component } from 'react'
import styled from 'styled-components'
import { rss } from '../../util/rss'
import Item from './Item'
import dayjs from 'dayjs'

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin: 2.5px;
  justify-content: flex-start;
`

const byDate = (a, b) => {
  const aDate = dayjs(a.date)
  const bDate = dayjs(b.date)

  return bDate.valueOf() - aDate.valueOf()
}

class Feed extends Component {
  state = {
    items: []
  }

  componentDidMount () {
    const feeds = [
      // rss('http://feeds.arstechnica.com/arstechnica/gaming'),
      // rss('https://xkcd.com/rss.xml')
      // rss('https://news.ycombinator.com/rss')
      rss(
        'https://www.mmo-champion.com/external.php?do=rss&type=newcontent&sectionid=1&days=120&count=5'
      )
    ]
    Promise.all(feeds).then(data => {
      const items = data.reduce((accum, { data: { feed } }) => {
        accum.push(...feed.items)
        return accum
      }, [])
      items.sort(byDate)
      this.setState({ items })
    })
  }

  render () {
    const { items } = this.state
    return (
      <Container>
        {items.map(item => <Item {...item} key={item.guid} />)}
      </Container>
    )
  }
}

export default Feed
