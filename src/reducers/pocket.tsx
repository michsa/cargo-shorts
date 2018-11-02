// import { combineReducers } from 'redux'
// import { ActionType } from 'typesafe-actions'
import { PocketState, PocketMap } from '../types'
// import { ADD_POCKET, DELETE_POCKET, MODIFY_POCKET } from '../../constants'

// import * as pocketActions from '../actions/pocket'
// export type PocketAction = ActionType<typeof pocketActions>

const initialState: PocketState = {
  byId: {
    'test-pocket': {
      id: 'test-pocket',
      name: 'Test Pocket',
      color: '#8cd1fc',
      icon: 'pizza',
      tabs: ['michsa']
    },
    'test-2': {
      id: 'test-2',
      name: 'Test Pocket 2',
      color: '#EB144C',
      icon: 'coffee',
      tabs: []
    }
  } as PocketMap,
  idList: ['test-pocket', 'test-2'] as string[]
}

const pocketReducer = (state: PocketState = initialState, action): PocketState => {
  return state
}

export default pocketReducer
