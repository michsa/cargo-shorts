import { createSelector } from 'reselect'
import { State, PocketState } from '../constants'

const pocketStateSelector = (state: State) => state.pocket

const pocketsByIdSelector = createSelector(
  pocketStateSelector,
  (pocket: PocketState) => pocket.byId
)

const pocketIdListSelector = createSelector(
  pocketStateSelector,
  (pocket: PocketState) => pocket.idList
)

export const orderedPocketSelector = createSelector(
  pocketIdListSelector,
  pocketsByIdSelector,
  (idList, pocketMap) => idList.map(id => pocketMap[id])
)