// import { combineReducers } from 'redux'
// import { ActionType } from 'typesafe-actions'
import { PocketState, PocketMap } from '../../types'
// import { ADD_POCKET, DELETE_POCKET, MODIFY_POCKET } from '../../constants'

// import * as pocketActions from '../actions/pocket'
// export type PocketAction = ActionType<typeof pocketActions>

const initialState: PocketState = {
  byId: {} as PocketMap,
  idList: [] as string[]
}


const pocketReducer = (state: PocketState = initialState, action): PocketState => {
  return state
}

export default pocketReducer
