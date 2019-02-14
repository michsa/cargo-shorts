import { createSelector } from 'reselect'
import { State, SavedTab, TabMap } from '../types'
import { keys, find, compose, eqProps, values } from 'ramda'

export const pocketsByIdSelector = ({pockets}: State) => pockets.byId
export const pocketIdListSelector = ({pockets}: State) => pockets.idList

export const orderedPocketSelector = createSelector(
  [pocketIdListSelector, pocketsByIdSelector],
  (idList, pockets) => idList.map(id => pockets[id])
)

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

export const currentPocketIdSelector = createSelector(
  [currentTabSelector],
  (tab: SavedTab | undefined) => tab === undefined ? null : tab.pocket
)


let ex: State = {
  router: {
    route: 'NEW_POCKET'
  },
  pockets: {
    byId: {
      '1': {
        id: '1',
        name: 'misc',
        color: '#FFF',
        icon: ':pizza:',
        tabs: ['4']
      },
      '2': {
        id: '2',
        name: 'other',
        color: '#F0E',
        icon: ':100:',
        tabs: ['5']
      }
    },
    idList: ['2', '1']
  },
  tabs: {
    byId: {
      '4': {
        id: '4',
        url: 'http://test.com',
        title: 'Test dot com',
        pocket: '1'
      },
      '5': {
        id: '5',
        url: 'http://michsa.me',
        title: 'MICHSA',
        pocket: '2'
      }
    },
    current: {
      url: 'http://michsa.me',
      title: 'MICHSA'
    }
  }
}

console.log(orderedPocketSelector(ex))
console.log(currentTabIdSelector(ex))

