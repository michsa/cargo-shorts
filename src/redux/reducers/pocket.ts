import { append, assoc, insert, lensPath, omit, over, without } from 'ramda'
import { combineReducers, Reducer } from 'redux'
import { ActionType, getType } from 'typesafe-actions'

import { PocketID, PocketMap, PocketState, TabID } from '../../types'
import * as pocket from '../actions/pocket'

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
  idList: ['2', '1'] as PocketID[]
}

// --- utilities --- //

const tabsLens = (pocketId: PocketID) => lensPath([pocketId, 'tabs'])

const insertOrAppend = (tabId: TabID, position?: number) =>
  position !== undefined ? insert(position, tabId) : append(tabId)

// --- reducers --- //

const byId: Reducer<PocketMap> = (
  state: PocketMap = initialState.byId,
  action: ActionType<typeof pocket>
): PocketMap => {
  switch (action.type) {
    case getType(pocket.newPocket):
      return assoc(action.payload.id, action.payload, state)

    case getType(pocket.deletePocket):
      return omit([action.payload], state)

    case getType(pocket.modifyPocket):
      return {
        ...state,
        [action.payload.id]: action.payload
      }

    case getType(pocket.unassignTab):
      return over(
        tabsLens(action.payload.pocketId),
        without([action.payload.tabId]),
        state
      )

    case getType(pocket.assignTab):
      return over(
        tabsLens(action.payload.pocketId),
        insertOrAppend(action.payload.tabId, action.payload.position),
        state
      )

    default:
      return state
  }
}

const idList: Reducer<PocketID[]> = (
  state: PocketID[] = initialState.idList,
  action: ActionType<typeof pocket>
): PocketID[] => {
  switch (action.type) {
    case getType(pocket.newPocket):
      return append(action.payload)(state)

    case getType(pocket.deletePocket):
      return without([action.payload], state)

    default:
      return state
  }
}

export default combineReducers({ byId, idList })
