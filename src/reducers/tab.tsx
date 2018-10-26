// import { ActionType, getType } from 'typesafe-actions'
import { TabState, TabMap, Tab } from '../types'
import { UPDATE_CURRENT_TAB } from '../constants'
import { combineReducers } from 'redux'

// import * as tab from '../actions/tab'

// export type TabAction = ActionType<typeof tab>
const initialState: TabState = {
  byId: {} as TabMap,
  current: {} as Tab
}

const tabsReducer = (state: TabMap = initialState.byId, action): TabMap => {
  return state
}

const currentTabReducer = (state = initialState.current, action): Tab | undefined => {
  if (action.type === UPDATE_CURRENT_TAB) {
    return action.payload
  } 
  else { 
    return state 
  }
}

export default combineReducers({
  byId: tabsReducer,
  current: currentTabReducer
})
