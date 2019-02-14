// import { ActionType, getType } from 'typesafe-actions'
import { TabState, TabMap, Tab } from '../types'
import { UPDATE_CURRENT_TAB, ADD_TAB } from '../constants'
import { combineReducers, Reducer } from 'redux'
import { v4 as uuid } from 'uuid'

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

const tabsReducer: Reducer<TabMap> = (
  state: TabMap = initialState.byId, action
) => {
  switch (action.type) {
    case ADD_TAB:
      console.log('ADD_TAB')
      console.log(action)
      console.log(state)
      return { ...state, [action.payload.id]: action.payload }
    default:
      return state
  }
}

const currentTabReducer: Reducer<Tab | undefined> = (
  state = initialState.current, action
) => {
  if (action.type === UPDATE_CURRENT_TAB) {
    console.log('UPDATE_CURRENT_TAB')
    console.log(action)
    console.log(state)
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
