import * as R from 'ramda'
import { applyMiddleware, createStore } from 'redux'
import { persistReducer, persistStore, PersistedState } from 'redux-persist'
import { syncStorage } from 'redux-persist-webextension-storage'
import thunk from 'redux-thunk'
import { createBackgroundStore } from 'redux-webext'
import { getType } from 'typesafe-actions'

import * as actions from './actions'
import * as ui from './actions/ui'
import reducer from './reducers'

const getOrReturn = <T extends R.Placeholder>(x: string) => (obj: T) =>
  R.propOr<T>(obj, x, obj)

const storageConfig = {
  key: 'syncStorage',
  storage: syncStorage,
  migrate: (state: PersistedState) =>
    Promise.resolve(
      R.over(R.lensPath(['pockets', 'idList']), getOrReturn('payload'), state)
    )
}

const persistedStore = () => {
  const store = createStore(
    persistReducer(storageConfig, reducer),
    applyMiddleware(thunk)
  )
  const persistor = persistStore(store)
  return { store, persistor }
}

export default createBackgroundStore({
  store: R.tap(x => console.log('persistedStore', x))(persistedStore().store),
  actions: {
    [getType(ui.requestCurrentTabInfo)]: actions.getCurrentTabInfo,
    [getType(ui.newTab)]: actions.newTab,
    [getType(ui.removeTab)]: actions.removeTab,
    [getType(ui.moveTab)]: actions.moveTab,
    [getType(ui.newPocket)]: actions.newPocket,
    [getType(ui.deletePocket)]: actions.deletePocket,
    [getType(ui.movePocket)]: actions.movePocket,
    [getType(ui.reorderPockets)]: actions.reorderPockets,
    [getType(ui.updatePocketSettings)]: actions.updatePocketSettings
  }
})
