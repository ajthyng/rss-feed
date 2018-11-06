import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import PlusIcon from '@material-ui/icons/Add'

class Header extends Component {
  render () {
    return (
      <AppBar position='static' color='primary'>
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
          <Button color='inherit' style={{ justifyContent: 'flex-end' }}>
            <PlusIcon />
            Add Feed
          </Button>
        </Toolbar>
      </AppBar>
    )
  }
}

export default Header
