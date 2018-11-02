import React, { Component } from 'react'
import { withTheme } from 'styled-components'
import Feed from './components/Feed/Feed'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import RssStore from './util/rss'
import Header from './components/Header/Header'
import LeftDrawer from './components/Drawer/LeftDrawer'

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
        <Header />
        <LeftDrawer />
        <Feed store={RssStore} />
      </MuiThemeProvider>
    )
  }
}

export default withTheme(App)
