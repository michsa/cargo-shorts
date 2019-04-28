import * as React from 'react'
import { ThemeProvider } from 'styled-components'

import theme from '../../theme'
import { FlexChild, FlexParent } from '../shared/flexbox'

import PocketIcons from './pocket-icons'
import PocketList from './pocket-list'

const App = () => (
  <ThemeProvider theme={theme}>
    <FlexParent id="page" flexDirection="column">
      <FlexParent
        className="page-header"
        alignItems="center"
        flex="0 0 48px"
      >
      
        <FlexChild flex="0 0 160px" className="title">
          <div className="shorts" />
          Cargo Shorts
        </FlexChild>
        <FlexChild flex={1} className="icons">
         <PocketIcons/>
        </FlexChild>
        <FlexChild flex="0 0 160px" className="buttons">
          (buttons)
        </FlexChild>
      </FlexParent>
      <PocketList/>
    </FlexParent>
  </ThemeProvider>
)

export default App
