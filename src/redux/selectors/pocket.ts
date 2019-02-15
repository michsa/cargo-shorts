import { createSelector } from 'reselect'

import { SavedTab, State } from '../../types'

import { currentTabSelector } from './tab'

export const pocketsByIdSelector =
  ({ pockets }: State) => pockets.byId

export const pocketIdListSelector =
  ({ pockets }: State) => pockets.idList

export const orderedPocketSelector = createSelector(
  [pocketIdListSelector, pocketsByIdSelector],
  (idList, pockets) => idList.map(id => pockets[id])
)

export const currentPocketIdSelector = createSelector(
  [currentTabSelector],
  (tab: SavedTab | undefined) => tab === undefined ? null : tab.pocket
)
