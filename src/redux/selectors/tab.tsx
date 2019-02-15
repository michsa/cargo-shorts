import { compose, eqProps, find, keys, values } from 'ramda'
import { createSelector } from 'reselect'

import { SavedTab, State, TabMap } from '../../types'

export const tabsByIdSelector = ({tabs}: State) => tabs.byId
export const currentTabInfoSelector = ({tabs}: State) => tabs.current

export const tabIdListSelector = createSelector(
  tabsByIdSelector,
  (tabs) => keys(tabs)
)

export const currentTabSelector = createSelector(
  [tabsByIdSelector, currentTabInfoSelector],
  (tabs, current) => compose<TabMap, SavedTab[], SavedTab | undefined>(
    find(eqProps('url', current)),
    values
  )(tabs)
)

export const currentTabIdSelector = createSelector(
  [currentTabSelector],
  (tab: SavedTab | null) => tab ? tab.id : null
)
