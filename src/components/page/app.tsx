import * as React from 'react'
import { ThemeProvider } from 'styled-components'

import theme from '../../theme'

import PocketList from './pocket-list'

const App = () => (
  <ThemeProvider theme={theme}>
    <div id="page">
      <PocketList />
    </div>
  </ThemeProvider>
)

export default App
