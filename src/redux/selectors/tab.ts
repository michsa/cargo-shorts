import { compose, eqProps, find, keys, values } from 'ramda'
import { createSelector } from 'reselect'

import { SavedTab, State, TabID, TabMap } from '../../types'

import { getTabIdListForPocket } from './pocket'

export const getTabs = (state: State) => state.tabs.byId

export const getTabById = (state: State, id: TabID) => state.tabs.byId[id]

export const getCurrentTab = (state: State) => state.tabs.current

export const getTabPocket = createSelector(
  [getTabById],
  (tab) => tab.pocket
)

export const getTabIdList = createSelector(
  [getTabs],
  (tabs) => keys(tabs)
)

export const getCurrentSavedTab = createSelector(
  [getTabs, getCurrentTab],
  (tabs, current) => compose<TabMap, SavedTab[], SavedTab | undefined>(
    find(eqProps('url', current)),
    values
  )(tabs)
)

export const getCurrentPocketId = createSelector(
  [getCurrentSavedTab],
  (tab: SavedTab | undefined) => tab === undefined ? null : tab.pocket
)

export const getCurrentTabId = createSelector(
  [getCurrentSavedTab],
  (tab: SavedTab | null) => tab ? tab.id : null
)

export const makeGetOrderedTabs = () => createSelector(
  [getTabIdListForPocket, getTabs],
  (idList, tabs) => idList.map(id => tabs[id])
)
