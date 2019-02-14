import pocketReducer from './pocket'
import tabReducer from './tab'
import { combineReducers, Reducer } from 'redux'
import { RouterState } from '../types'
import { ROUTE } from '../constants'

const defaultState: RouterState = {
  route: 'POCKET_LIST'
}

const routeReducer: Reducer<RouterState> = (
  state: RouterState = defaultState, action
) => {
  return (action.type === ROUTE) ? action.payload : state
}

const reducer = combineReducers({
  router: routeReducer,
  pockets: pocketReducer,
  tabs: tabReducer
})

export default reducer
