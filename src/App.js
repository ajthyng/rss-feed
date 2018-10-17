import React, { Component } from 'react'
import { withTheme } from 'styled-components'
import Feed from './components/Feed/Feed'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import PlusIcon from '@material-ui/icons/Add'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#4c5094',
      main: '#1a2866',
      dark: '#00003b',
      contrastText: '#fff'
    },
    secondary: {
      light: '#62a4d7',
      main: '#2a75a5',
      dark: '#004a76',
      contrastText: '#ffffff'
    }
  },
  typography: {
    useNextVariants: true
  }
})

class App extends Component {
  render () {
    return (
      <MuiThemeProvider theme={theme}>
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

        <Feed />
      </MuiThemeProvider>
    )
  }
}

export default withTheme(App)
