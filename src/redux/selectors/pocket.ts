import { createSelector } from 'reselect'

import { Pocket, PocketID, State } from '../../types'

export const getPockets = (state: State) => state.pockets.byId

export const getPocketById = (state: State, id: PocketID) =>
  state.pockets.byId[id]

export const getPocketIdList = (state: State) => state.pockets.idList

export const getOrderedPockets = createSelector(
  [getPocketIdList, getPockets],
  (idList, pockets) => idList.map(id => pockets[id])
)

export const getTabIdListForPocket = createSelector(
  [getPocketById],
  (pocket: Pocket) => pocket.tabs
)
