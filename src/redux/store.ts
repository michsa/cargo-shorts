import * as R from 'ramda'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { createBackgroundStore } from 'redux-webext'
import { action, ActionType, getType } from 'typesafe-actions'
import { ActionCreator, PayloadAction } from 'typesafe-actions/dist/types'

// import * as actions from './actions'
import { getCurrentTabInfo, moveTab, newTab, removeTab, requestCurrentTabInfo } from './actions'
import reducer from './reducers'

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default createBackgroundStore({
  store,
  actions: {
    [getType(requestCurrentTabInfo)]: getCurrentTabInfo,
    // [getType(moveTab)]: (payload: ActionType<typeof moveTab>['payload']) => moveTab
  }
})

/*
type InferPayload<T extends string> = 
  PayloadAction<T, ActionType<T>['payload']> extends PayloadAction<T, infer P> ? P : never
*/

const stripPayload = <T extends string>(fn: ActionCreator<T>) => (payload: {}) => payload

const moveTabStripped = stripPayload(moveTab)

const stripPayload2 = <A extends unknown[], P>(fn: (...args: A) => {type: string, payload: P}) => 
  (payload: P) => fn({...args: A}: P)

/*
(
  ({ payload }) => (fn(...args.map(arg => payload[arg])))
)
*/
