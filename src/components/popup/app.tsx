import { ThemeProvider } from 'emotion-theming'
import React from 'react'

import styled from '../../styled'
import theme from '../../theme'
import { RouterState } from '../../types'

import { route, useRouter } from './hooks'
import PocketList from './pocket-list'
import PocketSettings from './pocket-settings'

const AppHolder = styled.main`
  margin: 0;
  padding: 0;
  color: ${props => props.theme.colors.text};
`

const App = () => {
  const [routerState, setRoute] = useRouter(route.pocketList())

  const selectComponent = (currentRoute: RouterState) => {
    switch (currentRoute.id) {
      case 'NEW_POCKET':
        return <PocketSettings setRoute={setRoute} />
      case 'EDIT_POCKET':
        return <PocketSettings id={currentRoute.data} setRoute={setRoute} />
      case 'POCKET_LIST':
      default:
        return <PocketList setRoute={setRoute} />
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <AppHolder>{selectComponent(routerState)}</AppHolder>
    </ThemeProvider>
  )
}

export default App
