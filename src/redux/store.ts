// import { assoc } from 'ramda'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { createBackgroundStore } from 'redux-webext'
// import { action, ActionType, getType } from 'typesafe-actions'
// import { ActionCreator } from 'typesafe-actions/dist/types'

// import * as actions from './actions'
import { getCurrentTabInfo } from './actions'
import reducer from './reducers'

/*
export type ActFoo = ActionType<typeof actions>


export type Actions = ActionType<typeof actions>

export const bgAction = (ca: ActionType<typeof pocket | typeof route | typeof tab>) => action(ca.type, ca.payload)

export const bgAction2 = <T extends string>(xx: ActionCreator<T>) => {
  let xa: ActionType<typeof xx> = 
  action(getType(xx), ActionType<typeof xx>)
}

const reduceFn = <T extends string>(acc: {T: ActionCreator<T>}, x: ActionCreator<T>) => assoc(getType(x), x, acc)

const createActionMap = (actionCreators: Array<ActionCreator<string>>) =>
  actionCreators.reduce(reduceFn, {})

const a = createActionMap([actions.moveTab])
*/

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default createBackgroundStore({
  store,
  actions: {
    ['REQUEST_CURRENT_TAB_INFO']: getCurrentTabInfo
  }
})



/*
const stripPayload = (fn: Function, ...args) => (
  ({ payload }) => (fn(...args.map(arg => payload[arg])))
)
*/
