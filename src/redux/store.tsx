import { createStore, applyMiddleware } from 'redux'
import { createBackgroundStore } from 'redux-webext'
import { REQUEST_TAB_INFO } from '../constants'
import { getTabInfo } from './actions/tab'
import reducer from './reducers'
import thunk from 'redux-thunk'

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default createBackgroundStore({
  store,
  actions: {
    [REQUEST_TAB_INFO]: getTabInfo() 
  }
})