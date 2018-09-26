// import { ActionType, getType } from 'typesafe-actions'
import { TabMap, Tab } from '../../types'
import { UPDATE_CURRENT_TAB } from '../../constants'
import { combineReducers } from 'redux';

// import * as tab from '../actions/tab'

// export type TabAction = ActionType<typeof tab>

const currentTabReducer = (state: Tab, action): Tab => {
  if (action.type === UPDATE_CURRENT_TAB)
    return action.payload
  
  else return state
}

const tabsReducer = (state: TabMap, action): TabMap => {
  return state
}

export default combineReducers({
  byId: tabsReducer,
  current: currentTabReducer
})
