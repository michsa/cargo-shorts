import { Reducer } from 'redux'
import { ActionType } from 'typesafe-actions'

import { RouterState } from '../../types'
import * as route from '../actions/route'

// --- initial state --- ///

const defaultState: RouterState = {
  route: 'POCKET_LIST'
}

// --- reducer --- //

const router: Reducer<RouterState> = (
  state: RouterState = defaultState,
  action: ActionType<typeof route>
) => {
  return (action.type === 'ROUTE') ? action.payload : state
}

export default router
