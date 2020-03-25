import { assoc, assocPath, omit } from 'ramda'
import { combineReducers, Reducer } from 'redux'
import { ActionType, getType } from 'typesafe-actions'

import { Tab, TabMap, TabState } from '../../types'
import * as tab from '../actions/tab'

// --- initial state --- //

const initialState: TabState = {
  byId: {} as TabMap,
  current: {} as Tab
}

// --- reducer: tabs by id --- //

const byId: Reducer<TabMap> = (
  state: TabMap = initialState.byId,
  action: ActionType<typeof tab>
) => {
  switch (action.type) {

    case getType(tab.newTab):
      return assoc(action.payload.id, action.payload, state)

    case getType(tab.deleteTab):
      return omit([action.payload], state)

    case getType(tab.updateTabPocket):
      return assocPath(
        [action.payload.tabId, 'pocket'],
        action.payload.pocketId,
        state
      )

    default:
      return state
  }
}

// --- reducer: current tab --- //

const current: Reducer<Tab | undefined> = (
  state = initialState.current,
  action: ActionType<typeof tab.updateCurrentTab>
) => {
  return (action.type === getType(tab.updateCurrentTab))
    ? action.payload || state
    : state
}

export default combineReducers({ byId, current })
