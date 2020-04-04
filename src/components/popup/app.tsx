/** @jsx jsx */
import { jsx } from '@emotion/core'
import { ThemeProvider } from 'emotion-theming'

import theme from '../../theme'
import { RouterState } from '../../types'
import GlobalStyles from '../shared/global-styles'

import { route, useRouter } from './hooks'
import PocketList from './pocket-list'
import PocketSettings from './pocket-settings'

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
      <GlobalStyles />
      <main
        css={theme => ({
          margin: 0,
          padding: 0,
          color: theme.colors.text,
          width: 300
        })}
      >
        {selectComponent(routerState)}
      </main>
    </ThemeProvider>
  )
}

export default App
