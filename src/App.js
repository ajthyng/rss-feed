import React, { Component } from 'react'
import styled, { withTheme } from 'styled-components'
import Feed from './components/Feed/Feed'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import PlusIcon from '@material-ui/icons/Add'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import Backdrop from '@material-ui/core/Backdrop'

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
  }
})

const Container = styled.div`
  background-color: ${props => props.theme.background};
  overflow-y: scroll;
  height: 100%;
  width: 100%;
  position: fixed;
`

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
            <Typography variant='h6' color='inherit' style={{ flexGrow: 1 }}>
              News
            </Typography>
            <Button color='inherit'>
              <PlusIcon />
              Add Feed
            </Button>
          </Toolbar>
        </AppBar>
        <Backdrop>
          <Feed />
        </Backdrop>

      </MuiThemeProvider>
    )
  }
}

export default withTheme(App)
