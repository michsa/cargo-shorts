// import { combineReducers } from 'redux'
import { ActionType } from 'typesafe-actions'
import { PocketState } from '../constants'
import { ADD_POCKET, DELETE_POCKET, MODIFY_POCKET } from '../constants'

import * as pocketActions from '../actions/pocket'
export type PocketAction = ActionType<typeof pocketActions>


const pocketReducer = (state: PocketState, action: PocketAction): PocketState => {
  switch (action.type) {
    case ADD_POCKET:
      return state

    case DELETE_POCKET:
      return state
    
    case MODIFY_POCKET:
      return state
      
    default:
      return state
  }
}

export default pocketReducer
