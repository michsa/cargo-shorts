import { append, assoc, insert, lensPath, move, omit, over, without } from 'ramda'
import { combineReducers, Reducer } from 'redux'
import { ActionType, getType } from 'typesafe-actions'

import { Pocket, PocketID, PocketMap, PocketState, TabID } from '../../types'
import * as pocket from '../actions/pocket'

// --- initial state --- //

const initialState: PocketState = {
  byId: {} as PocketMap,
  idList: [] as PocketID[]
}

// --- utilities --- //

const tabsLens = (pocketId: PocketID) => lensPath([pocketId, 'tabs'])

const insertOrAppend = (tabId: TabID, position?: number) =>
  position !== undefined ? insert(position, tabId) : append(tabId)

// fisher-yates shuffle, cribbed from somewhere or other
const shuffle = <T>(xs: T[]) => {
  let a = [...xs]
  let counter = xs.length
  while (counter > 0) {
    // pick a random index
    const index = Math.floor(Math.random() * counter)
    // decrease counter by 1
    counter--
    // and swap the last element with it
    let temp = a[counter]
    a[counter] = a[index]
    a[index] = temp
  }
  return a
}

// --- reducer: pockets by id --- //

const byId: Reducer<PocketMap> = (
  state: PocketMap = initialState.byId,
  action: ActionType<typeof pocket>
): PocketMap => {
  switch (action.type) {

    case getType(pocket.newPocket):
      const newState = assoc<Pocket, PocketMap, PocketID>(
        action.payload.id,
        {
          ...action.payload.settings,
          id: action.payload.id,
          tabs: []
        },
        state
      )
      return newState

    case getType(pocket.deletePocket):
      return omit([action.payload], state)

    case getType(pocket.updatePocket):
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          ...action.payload.settings
        }
      }

    case getType(pocket.unassignTab):
      return over<PocketMap>(
        tabsLens(action.payload.pocketId),
        without([action.payload.tabId]),
        state
      )

    case getType(pocket.assignTab):
      return over<PocketMap>(
        tabsLens(action.payload.pocketId),
        insertOrAppend(action.payload.tabId, action.payload.position),
        state
      )

    default:
      return state
  }
}

// --- reducer: pocket id list --- //

const idList: Reducer<PocketID[]> = (
  state: PocketID[] = initialState.idList,
  action: ActionType<typeof pocket>
): PocketID[] => {
  switch (action.type) {

    case getType(pocket.newPocket):
      return append<PocketID>(action.payload.id)(state)

    case getType(pocket.deletePocket):
      return without<PocketID>([action.payload], state)

    case getType(pocket.shufflePockets):
      return shuffle(state)

    case getType(pocket.movePocket):
      return move(action.payload.start, action.payload.end, state)

    default:
      return state
  }
}

export default combineReducers({ byId, idList })
