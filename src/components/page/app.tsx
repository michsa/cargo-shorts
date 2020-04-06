/** @jsx jsx */
import { jsx } from '@emotion/core'
import { ThemeProvider } from 'emotion-theming'

import theme from '../../theme'
import GlobalStyles from '../shared/global-styles'

import { GridProvider } from './grid-context'
import PageHeader from './page-header'
import PocketList from './pocket-list'

const App = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <GridProvider>
      <PageHeader />
      <PocketList />
    </GridProvider>
  </ThemeProvider>
)

export default App
