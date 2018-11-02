import React, { Component } from 'react'
import styled from 'styled-components'
import Drawer from '@material-ui/core/Drawer'

const Container = styled.div`
  width: 250px;
`

class LeftDrawer extends Component {
  render () {
    return (
      <Drawer anchor='left' open={false}>
        <Container />
      </Drawer>
    )
  }
}

export default LeftDrawer
