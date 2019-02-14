import { createStore, applyMiddleware } from 'redux'
import { createBackgroundStore } from 'redux-webext'
import { REQUEST_CURRENT_TAB_INFO, NEW_TAB, ROUTE } from './constants'
import { getCurrentTabInfo, newTab, route } from './actions'
import reducer from './reducers'
import thunk from 'redux-thunk'

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

console.log('store.tsx')
console.log(store.getState())
/*
const testAddTab = ({payload}) => {
  console.log('test add tab')
  console.log(payload)
  return addTab(payload)
}
*/

export default createBackgroundStore({
  store,
  actions: {
    [REQUEST_CURRENT_TAB_INFO]: getCurrentTabInfo,
    [NEW_TAB]: newTab,
    [ROUTE]: route
  }
})

/*
const stripPayload = (fn: Function, ...args) => (
  ({ payload }) => (fn(...args.map(arg => payload[arg])))
)
*/
