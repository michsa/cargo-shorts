import pocketReducer from './pocket'
import tabReducer from './tab'
import { combineReducers } from 'redux'
import { Route } from '../types'
import { ROUTE } from '../constants'

const routeReducer = (state: Route = Route.POCKET_LIST, action): Route => {
  switch (action.type) {
    case ROUTE:
      return action.payload
    default:
      return state
  }
}

const reducer = combineReducers({
  route: routeReducer,
  pockets: pocketReducer,
  tabs: tabReducer
})

export default reducer
