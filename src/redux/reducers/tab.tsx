import { omit } from 'ramda'
import { combineReducers, Reducer } from 'redux'
import { ActionType } from 'typesafe-actions'

import { Tab, TabMap, TabState } from '../../types'
import { removePocket } from '../actions/pocket'
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
  action: ActionType<typeof tab> | ActionType<typeof removePocket>
) => {
  switch (action.type) {
    case 'NEW_TAB':
      return {
        ...state,
        [action.payload.tabId]:
        {
          ...action.payload.tab,
          id: action.payload.tabId,
          pocket: action.payload.pocketId
        }
      }

    case 'MOVE_TAB':
      return {
        ...state,
        [action.payload.tab.id]: {
          ...action.payload.tab,
          pocket: action.payload.pocketId
        }
      }

    case 'REMOVE_TAB':
      return omit([action.payload.id], state)

    case 'REMOVE_POCKET':
      return omit(action.payload.tabs, state)

    default:
      return state
  }
}

// --- reducer: current tab --- //

const current: Reducer<Tab | undefined> = (
  state = initialState.current,
  action: ActionType<typeof tab.updateCurrentTab>
) => {
  if (action.type === 'UPDATE_CURRENT_TAB') {
    return action.payload
  }
  else {
    return state
  }
}

export default combineReducers({ byId, current })