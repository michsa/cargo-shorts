import { createSelector } from 'reselect'
import { State } from '../types'
import * as _ from 'lodash'

export const pocketsByIdSelector = (state: State) => state.pockets.byId

export const pocketIdListSelector = (state: State) => state.pockets.idList

export const orderedPocketSelector = createSelector(
  [pocketIdListSelector, pocketsByIdSelector],
  (idList, pockets) => idList.map(id => pockets[id])
)

export const tabStateSelector = (state: State) => state.tabs
export const tabsByIdSelector = (state: State) => state.tabs.byId
export const currentTabInfoSelector = (state: State) => state.tabs.current

export const tabIdListSelector = createSelector(
  tabsByIdSelector,
  (tabs) => _.keys(tabs)
)

export const currentTabIdSelector = createSelector(
  [tabsByIdSelector, currentTabInfoSelector],
  (tabs, current) => _.findKey(tabs, (tab) => tab === current)
)

export const currentPocketIdSelector = createSelector(
  [pocketsByIdSelector, currentTabIdSelector],
  (pockets, tab) => _.findKey(pockets, (pocket) => _.includes(pocket.tabs, tab))
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
