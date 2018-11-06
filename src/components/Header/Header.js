import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import PlusIcon from '@material-ui/icons/Add'
import AddFeed from '../AddFeed/AddFeed'

class Header extends Component {
  state = {
    addFeedOpen: false
  }

  handleClose = () => {
    this.setState({ addFeedOpen: false })
  }

  handleOpen = () => {
    this.setState({ addFeedOpen: true })
  }

  render () {
    return (
      <AppBar position='static' color='primary'>
        <AddFeed open={this.state.addFeedOpen} handleClose={this.handleClose} />
        <Toolbar>
          <IconButton
            style={{ marginLeft: -12, marginRight: 20 }}
            color='inherit'
            aria-label='Menu'
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' color='inherit' style={{ flex: 1 }}>
            News
          </Typography>
          <Button
            color='inherit'
            onClick={this.handleOpen}
            style={{ justifyContent: 'flex-end' }}
          >
            <PlusIcon />
            Add Feed
          </Button>
        </Toolbar>
      </AppBar>
    )
  }
}

export default Header
