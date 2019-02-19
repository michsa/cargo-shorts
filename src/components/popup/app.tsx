import React from 'react'
import styled from 'styled-components'

import { RouterState } from '../../types'

import { route, useRouter } from './hooks'
import PocketList from './pocket-list'
import PocketSettings from './pocket-settings'

const AppHolder = styled.main`
  padding: 8px;
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
    <AppHolder>
      {selectComponent(routerState)}
    </AppHolder>
  )

}

export default App
