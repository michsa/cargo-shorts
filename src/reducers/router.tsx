import { Reducer } from 'redux'
import { RouterState } from '../types'
import { ROUTE } from '../constants'

const defaultState: RouterState = {
  route: 'POCKET_LIST'
}

const router: Reducer<RouterState> = (
  state: RouterState = defaultState, action
) => {
  return (action.type === ROUTE) ? action.payload : state
}

export default router
