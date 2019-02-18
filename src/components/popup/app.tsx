import * as React from 'react'
import { useState } from 'react'

import { EditPocketRoute, NewPocketRoute, PocketID, PocketListRoute, RouterState } from '../../types'

import PocketConfig from './pocket-config'
import PocketList from './pocket-list'

export type RouteMap = {
  newPocket: () => void,
  pocketList: () => void,
  editPocket: (id: PocketID) => void
}

const App = () => {
  const [router, setRouter] = useState({ route: 'POCKET_LIST' } as RouterState)

  const route = {
    newPocket: () => setRouter({ route: 'NEW_POCKET' } as NewPocketRoute),
    pocketList: () => setRouter({ route: 'POCKET_LIST' } as PocketListRoute),
    editPocket: (id: PocketID) => setRouter({ id } as EditPocketRoute)
  } as RouteMap

  const selectComponent = (selectedRouter: RouterState) => {
    switch (selectedRouter.route) {
      case 'NEW_POCKET':
        return <PocketConfig isNew={true} />
      case 'EDIT_POCKET':
        return <PocketConfig id={selectedRouter.id} isNew={false} />
      case 'POCKET_LIST':
      default:
        return <PocketList route={route} />
    }
  }

  return (
    <div>
      <p>CARGO SHORTS</p>
      <p>route: {router.route}</p>
      {selectComponent(router)}
    </div>
  )

}

export default App
