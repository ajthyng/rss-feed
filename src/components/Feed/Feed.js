import React, { Component } from 'react'
import styled from 'styled-components'
import { rss } from '../../util/rss'
import Grid from '@material-ui/core/Grid'
import dayjs from 'dayjs'
import CardItem from './CardItem'

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin: 12px;
  justify-content: space-around;
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
      rss('http://feeds.arstechnica.com/arstechnica/gaming', 'Ars Technica'),
      rss('https://xkcd.com/rss.xml', 'XKCD'),
      rss('https://news.ycombinator.com/rss', 'Y Combinator'),
      rss('https://www.mmo-champion.com/external.php?do=rss&type=newcontent&sectionid=1&days=120&count=5', 'MMO Champion')
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
        <Grid container spacing={16}>
          {items.map((item, index) => (
            <Grid key={index.toString(10)} item xs={12} sm={6} md={4} lg={3} xl={2}>
              <CardItem {...item} />
            </Grid>
          ))}
        </Grid>
      </Container>
    )
  }
}

export default Feed
