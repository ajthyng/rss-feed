import React, { Component } from 'react'
import styled from 'styled-components'
import { getRss } from '../../util/rss'
import Grid from '@material-ui/core/Grid'
import dayjs from 'dayjs'
import CardItem from './CardItem'
import { observer } from 'mobx'

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

@observer class Feed extends Component {
  state = {
    items: []
  }

  setItems = items => this.setState({ items: items.sort(byDate) })

  componentDidMount () {
    const feeds = [
      { url: 'http://feeds.arstechnica.com/arstechnica/gaming', tag: 'Ars Technica' },
      { url: 'https://xkcd.com/rss.xml', tag: 'XKCD' },
      { url: 'https://news.ycombinator.com/rss', tag: 'Y Combinator' },
      { url: 'https://www.mmo-champion.com/external.php?do=rss&type=newcontent&sectionid=1&days=120&count=5', tag: 'MMO Champion' }
    ]

    getRss(feeds)
  }

  componentWillUnmount () {
    this.rss$.unsubscribe()
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
