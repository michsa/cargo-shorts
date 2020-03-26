import { ThemeProvider } from 'emotion-theming'
import * as React from 'react'
import { Flex } from 'reflexbox'

import theme from '../../theme'

import PageHeader from './page-header'
import PocketList from './pocket-list'

const App = () => (
  <ThemeProvider theme={theme}>
    <Flex id="page" flexDirection="column">
      <PageHeader />
      <PocketList />
    </Flex>
  </ThemeProvider>
)

export default App
