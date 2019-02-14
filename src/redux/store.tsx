import { createStore, applyMiddleware } from 'redux'
import { createBackgroundStore } from 'redux-webext'
import { getCurrentTabInfo } from './actions'
import reducer from './reducers'
import thunk from 'redux-thunk'

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

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
    ['REQUEST_CURRENT_TAB_INFO']: getCurrentTabInfo,
  }
})

/*
const stripPayload = (fn: Function, ...args) => (
  ({ payload }) => (fn(...args.map(arg => payload[arg])))
)
*/
