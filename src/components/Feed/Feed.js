import React, { Component } from 'react'
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid'
import CardItem from './CardItem'

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin: 12px;
  justify-content: space-around;
`

class Feed extends Component {
  componentDidMount () {
    this.props.store.rssFeeds()
  }
  render () {
    const { rssItems } = this.props.store
    return (
      <Container>
        <Grid container spacing={16}>
          {rssItems.map((item, index) => (
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
