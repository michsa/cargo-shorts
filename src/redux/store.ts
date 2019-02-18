import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { createBackgroundStore } from 'redux-webext'
import { getType } from 'typesafe-actions'

import * as actions from './actions'
import * as ui from './actions/ui'
import reducer from './reducers'

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default createBackgroundStore({
  store,
  actions: {
    [getType(ui.requestCurrentTabInfo)]: actions.getCurrentTabInfo,
    [getType(ui.newTab)]: actions.newTab,
    [getType(ui.removeTab)]: actions.removeTab,
    [getType(ui.moveTab)]: actions.moveTab,
    [getType(ui.newPocket)]: actions.newPocket,
    [getType(ui.updatePocketSettings)]: actions.updatePocketSettings
  }
})
