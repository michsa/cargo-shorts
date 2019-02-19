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
        return <PocketSettings setRoute={setRoute} />
      case 'EDIT_POCKET':
        return <PocketSettings id={currentRoute.data} setRoute={setRoute} />
      case 'POCKET_LIST':
      default:
        return <PocketList setRoute={setRoute} />
    }
  }

  return (
    <div>
      {selectComponent(routerState)}
    </div>
  )

}

export default App
