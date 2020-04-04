import { ThemeProvider } from 'emotion-theming'
import * as React from 'react'

import theme from '../../theme'
import Flex from '../shared/flex'
import GlobalStyles from '../shared/global-styles'

import PageHeader from './page-header'
import PocketList from './pocket-list'

const App = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <Flex id="page" column>
      <PageHeader />
      <PocketList />
    </Flex>
  </ThemeProvider>
)

export default App
