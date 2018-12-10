import { createStore, applyMiddleware } from 'redux'
import { createBackgroundStore } from 'redux-webext'
import { REQUEST_TAB_INFO, ADD_TAB, ASSIGN_TAB, UNASSIGN_TAB, ROUTE } from './constants'
import { getTabInfo, addTab, assignTab, route } from './actions'
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
    [REQUEST_TAB_INFO]: getTabInfo,
    [ADD_TAB]: ({ payload }) => (addTab(payload)),
    [ASSIGN_TAB]: assignTab,
    [UNASSIGN_TAB]: ({ id, tab }) => assignTab(id, tab),
    [ROUTE]: route
  }
})
/*
const stripPayload = (fn: Function, ...args) => (
  ({ payload }) => (fn(...args.map(arg => payload[arg])))
)
*/
