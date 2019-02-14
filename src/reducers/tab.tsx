// import { ActionType, getType } from 'typesafe-actions'
import * as uuid from 'uuid'
import { omit } from 'ramda'
import { combineReducers, Reducer } from 'redux'
import { TabState, TabMap, Tab } from '../types'
import { UPDATE_CURRENT_TAB, NEW_TAB, MOVE_TAB, REMOVE_TAB, REMOVE_POCKET } from '../constants'

// import * as tab from '../actions/tab'

// export type TabAction = ActionType<typeof tab>
const initialState: TabState = {
  byId: {
    'michsa': {
      url: 'https://michsa.me/',
      title: 'michsa.me',
      id: uuid(),
      pocket: '1'
    }
  } as TabMap,
  current: {} as Tab
}

const byId: Reducer<TabMap> = (
  state: TabMap = initialState.byId, action
) => {
  const payload = action.payload
  switch (action.type) {
    case NEW_TAB:
      return {
        ...state,
        [payload.tabId]:
        {
          ...payload.tab,
          id: payload.tabId,
          pocket: payload.pocketId
        }
      }

    case MOVE_TAB:
      return {
        ...state,
        [payload.tab.id]: {
          ...payload.tab,
          pocket: payload.pocketId
        }
      }

    case REMOVE_TAB:
      return omit(payload.tab.id, state)

    case REMOVE_POCKET:
      return omit(payload.tabs, state)

    default:
      return state
  }
}

const current: Reducer<Tab | undefined> = (
  state = initialState.current, action
) => {
  if (action.type === UPDATE_CURRENT_TAB) {
    return action.payload
  }
  else {
    return state
  }
}

export default combineReducers({byId, current})
