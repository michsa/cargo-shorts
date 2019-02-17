import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { createBackgroundStore } from 'redux-webext'
import { getType } from 'typesafe-actions'

import * as actions from './actions'
import * as uiActions from './actions/ui'
import reducer from './reducers'

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default createBackgroundStore({
  store,
  actions: {
    [getType(uiActions.requestCurrentTabInfo)]: actions.getCurrentTabInfo,
    [getType(uiActions.newTab)]: actions.newTab,
    [getType(uiActions.removeTab)]: actions.removeTab,
    [getType(uiActions.moveTab)]: actions.moveTab
  }
})
