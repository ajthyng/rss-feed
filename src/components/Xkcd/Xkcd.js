import React, { Component } from 'react'
import styled from 'styled-components'
import { rss } from '../../util/rss'

const Container = styled.div`
  display: flex;
  flex: 1;
  background-color: white;
  border-radius: 10px;
  flex-direction: column;
  align-content: stretch;
  overflow: hidden;
`

const Top = styled.div`
  flex: 1;
  background-color: tomato;
`

const Bottom = styled.div`
  flex: 1;
  background-color: forestgreen;
`

class Xkcd extends Component {
  state = {
    comics: []
  }
  componentDidMount () {
    rss('https://xkcd.com/rss.xml').then(({ data }) => {
      this.setState({ comics: data.feed.items })
    })
  }

  render () {
    return (
      <Container style={{ overflowY: 'auto' }}>
        {this.state.comics.map(item => (
          <div dangerouslySetInnerHTML={{ __html: item.description }} />
        ))}
      </Container>
    )
  }
}

export default Xkcd
