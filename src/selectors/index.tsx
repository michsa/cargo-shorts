import { createSelector } from 'reselect'
import { State } from '../types'
import { keys, findKey, includes } from 'lodash'

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

export const currentTabIdSelector = createSelector(
  [tabsByIdSelector, currentTabInfoSelector],
  (tabs, current) => findKey(tabs, (tab) => current && tab.url === current.url)
)

export const currentPocketIdSelector = createSelector(
  [pocketsByIdSelector, currentTabIdSelector],
  (pockets, tab) => findKey(pockets, (pocket) => includes(pocket.tabs, tab))
)

/*
let ex: State = {
  pockets: {
    byId: {
      '1': {
        name: 'misc',
        color: '#FFF',
        icon: ':pizza:',
        tabs: ['4']
      },
      '2': {
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
        url: 'http://test.com',
        title: 'Test dot com'
      },
      '5': {
        url: 'http://michsa.me',
        title: 'MICHSA'
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
*/
