import pocketReducer from './pocket'
import tabReducer from './tab'
import { combineReducers } from 'redux'
import { RouterState } from '../types'
import { ROUTE } from '../constants'

const defaultState: RouterState = {
  route: 'POCKET_LIST'
}

const routeReducer = (state: RouterState = defaultState, action): RouterState => {
  return (action.type === ROUTE) ? action.payload : state
}

const reducer = combineReducers({
  router: routeReducer,
  pockets: pocketReducer,
  tabs: tabReducer
})

export default reducer
