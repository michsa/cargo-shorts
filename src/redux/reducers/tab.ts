import { assoc, assocPath, omit } from 'ramda'
import { combineReducers, Reducer } from 'redux'
import { ActionType, getType } from 'typesafe-actions'

import { Tab, TabMap, TabState } from '../../types'
import * as tab from '../actions/tab'

// --- initial state --- //

const initialState: TabState = {
  byId: {
    '5': {
      url: 'https://michsa.me/',
      title: 'michsa.me',
      id: '5',
      pocket: '1'
    }
  } as TabMap,
  current: {} as Tab
}

// --- reducer: tabs by id --- //

const byId: Reducer<TabMap> = (
  state: TabMap = initialState.byId,
  action: ActionType<typeof tab>
) => {
  console.log("tab.byId reducer")
  console.log(action)
  switch (action.type) {

    case getType(tab.newTab):
      const newState = assoc(action.payload.id, action.payload, state)
      console.log(newState)
      return newState

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
    ? action.payload
    : state
}

export default combineReducers({ byId, current })