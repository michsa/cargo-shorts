import { useState } from 'react'

import { EditPocketRoute, NewPocketRoute, PocketListRoute, RouterState } from '../../types'

export const useRouter = (initialState: RouterState) => {
  const [state, setState] = useState(initialState as RouterState)

  function setRoute(newState: RouterState) {
    setState(newState)
  }

  return [state, setRoute] as [RouterState, (newState: RouterState) => void]
}

export const route = {
  newPocket: () =>
    ({ id: 'NEW_POCKET' } as NewPocketRoute),
  editPocket: (data: string) =>
    ({ id: 'EDIT_POCKET', data } as EditPocketRoute),
  pocketList: () =>
    ({ id: 'POCKET_LIST', } as PocketListRoute)
}
