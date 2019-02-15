import { append, compose, insert, lensPath, over, without } from 'ramda'
import { Reducer } from 'redux'
import { ActionType } from 'typesafe-actions'

import { PocketID, PocketMap, PocketState, TabID } from '../../types'
import * as pocket from '../actions/pocket'
import { moveTab, newTab, removeTab } from '../actions/tab'

// --- initial state --- //

const initialState: PocketState = {
  byId: {
    '1': {
      id: '1',
      name: 'HEY',
      color: '#8cd1fc',
      icon: 'pizza',
      tabs: ['5']
    },
    '2': {
      id: '2',
      name: 'Mama',
      color: '#EB144C',
      icon: 'coffee',
      tabs: []
    }
  } as PocketMap,
  idList: ['2', '1'] as string[]
}

// --- utilities --- //

const tabsLens = (pocketId: PocketID) => lensPath(['byId', pocketId, 'tabs'])

const insertOrAppend = (tabId: TabID, position?: number) =>
  position !== undefined ? insert(position, tabId) : append(tabId)

const assignTab = (pocketId: PocketID, tabId: TabID, position?: number) =>
  (state: PocketState) => over(tabsLens(pocketId), insertOrAppend(tabId, position), state)

const unassignTab = (pocketId: PocketID, tabId: TabID) =>
  (state: PocketState) => over(tabsLens(pocketId), without([tabId]), state)

// --- reducer --- //

const pockets: Reducer<PocketState> = (
  state: PocketState = initialState,
  action: ActionType<typeof pocket | typeof moveTab | typeof removeTab | typeof newTab>
): PocketState => {
  switch (action.type) {
    case 'MOVE_TAB':
      return compose(
        assignTab(
          action.payload.pocketId,
          action.payload.tab.id,
          action.payload.position
        ),
        unassignTab(
          action.payload.tab.pocket,
          action.payload.tab.id
        )
      )(state)

    case 'REMOVE_TAB':
      return unassignTab(
        action.payload.pocket,
        action.payload.id
      )(state)

    case 'NEW_TAB':
      return state

    case 'NEW_POCKET':
      return state

    case 'REMOVE_POCKET':
      return state

    case 'MODIFY_POCKET':
      return state

    default:
      return state
  }
}

export default pockets
