// import { combineReducers } from 'redux'
import { lensPath, over, append, without, insert, compose } from 'ramda'
import { Reducer } from 'redux'

import { PocketState, PocketMap, PocketID, TabID } from '../types'
import {
  NEW_TAB, MOVE_TAB, REMOVE_TAB,
  NEW_POCKET, REMOVE_POCKET, MODIFY_POCKET
} from '../constants'

//---------------//
// initial state //
//---------------//

const initialState: PocketState = {
  byId: {
    'test-pocket': {
      id: 'test-pocket',
      name: 'Test Pocket',
      color: '#8cd1fc',
      icon: 'pizza',
      tabs: ['michsa']
    },
    'test-2': {
      id: 'test-2',
      name: 'Test Pocket 2',
      color: '#EB144C',
      icon: 'coffee',
      tabs: []
    }
  } as PocketMap,
  idList: ['test-pocket', 'test-2'] as string[]
}

//-----------//
// utilities //
//-----------//

const tabsLens = (pocketId: PocketID) => lensPath(['byId', pocketId, 'tabs'])

const insertOrAppend = (tabId: TabID, position?: number) =>
  position !== undefined ? insert(position, tabId) : append(tabId)

const assignTab = (pocketId: PocketID, tabId: TabID, position?: number) =>
  (state: PocketState) => over(tabsLens(pocketId), insertOrAppend(tabId, position), state)

const unassignTab = (pocketId: PocketID, tabId: TabID) =>
  (state: PocketState) => over(tabsLens(pocketId), without([tabId]), state)

//---------//
// reducer //
//---------//

const pockets: Reducer<PocketState> = (
  state: PocketState = initialState, action
): PocketState => {
  const payload = action.payload
  switch (action.type) {
    case MOVE_TAB:
      return compose(
        assignTab(payload.pocketId, payload.tab.id, payload.position),
        unassignTab(payload.tab.pocket, payload.tab.id)
      )(state)

    case REMOVE_TAB:
      return unassignTab(payload.tab.pocket, payload.tab.id)(state)

    case NEW_TAB:
      return state

    case NEW_POCKET:
      return state

    case REMOVE_POCKET:
      return state

    case MODIFY_POCKET:
      return state

    default:
      return state
  }
}

export default pockets
