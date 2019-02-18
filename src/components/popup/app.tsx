import * as React from 'react'

import { RouterState } from '../../types'

import PocketList from './pocket-list'
import PocketSettings from './pocket-settings'
import { route, useRouter } from './router'

const App = () => {
  const [routerState, setRoute] = useRouter(route.pocketList())

  const selectComponent = (currentRoute: RouterState) => {
    switch (currentRoute.id) {
      case 'NEW_POCKET':
        return <PocketSettings isNew={true} setRoute={setRoute} />
      case 'EDIT_POCKET':
        return <PocketSettings id={currentRoute.id} isNew={false} setRoute={setRoute} />
      case 'POCKET_LIST':
      default:
        return <PocketList setRoute={setRoute} />
    }
  }

  return (
    <div>
      <p>CARGO SHORTS</p>
      <p>route: {routerState.id}</p>
      {selectComponent(routerState)}
    </div>
  )

}

export default App
