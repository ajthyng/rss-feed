import React from 'react'
import { ThemeProvider } from 'styled-components'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { theme } from './constants/theme'
import { render } from 'mirrorx'

require('./store/Feeds')
require('./store/RSS')

const ThemedApp = props => (
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
)

render(<ThemedApp />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
