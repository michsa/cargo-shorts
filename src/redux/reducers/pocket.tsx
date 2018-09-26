// import { combineReducers } from 'redux'
// import { ActionType } from 'typesafe-actions'
import { PocketState } from '../../types'
// import { ADD_POCKET, DELETE_POCKET, MODIFY_POCKET } from '../../constants'

// import * as pocketActions from '../actions/pocket'
// export type PocketAction = ActionType<typeof pocketActions>


const pocketReducer = (state: PocketState = {byId: {}, idList: []}, action): PocketState => {
  return state
}

export default pocketReducer
