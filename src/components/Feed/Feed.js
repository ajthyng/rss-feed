import React, { Component } from 'react'
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid'
import CardItem from './CardItem'
import { actions, connect } from 'mirrorx'
import dayjs from 'dayjs'

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin: 12px;
  justify-content: space-around;
`

const byDate = (a, b) => {
  return dayjs(b.date).valueOf() - dayjs(a.date).valueOf()
}
class Feed extends Component {
  componentDidMount () {
    actions.rss.getRssFeeds(this.props.rssUrls)
  }

  componentDidUpdate (prevProps) {
    const { rssUrls } = this.props
    if (prevProps.rssUrls.length !== rssUrls.length) {
      actions.rss.getRssFeeds(rssUrls)
    }
  }

  renderStory = (item, i) => (
    <Grid key={i.toString(10)} item xs={12} sm={6} md={4} lg={3} xl={2}>
      <CardItem {...item} />
    </Grid>
  )

  render () {
    const { rssFeeds = [] } = this.props
    return (
      <Container>
        <Grid container spacing={16}>
          {rssFeeds.sort(byDate).map(this.renderStory)}
        </Grid>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  rssFeeds: state.rss.feeds,
  rssUrls: state.urls.rss
})

export default connect(mapStateToProps)(Feed)
