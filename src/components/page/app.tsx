import * as React from 'react'
import { ThemeProvider } from 'styled-components'

import theme from '../../theme'
import { FlexParent } from '../shared/flexbox'

import PageHeader from './page-header'
import PocketList from './pocket-list'

const App = () => (
  <ThemeProvider theme={theme}>
    <FlexParent id="page" flexDirection="column">
      <PageHeader />
      <PocketList />
    </FlexParent>
  </ThemeProvider>
)

export default App
