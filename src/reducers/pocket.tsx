// import { combineReducers } from 'redux'
import { PocketState, PocketMap } from '../types'
import { filter } from 'ramda'
import { POCKET_ASSIGN_TAB, POCKET_UNASSIGN_TAB } from '../constants'
import { Reducer } from 'redux'

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

const pocketReducer: Reducer<PocketState> = (
  state: PocketState = initialState, action
): PocketState => {
  switch (action.type) {
    case POCKET_ASSIGN_TAB:
      console.log('ASSIGN_TAB')
      console.log(action)
      console.log(state)
      // there has to be a better way to do this
      return {
        byId: {
          [action.payload.id]: {
            tabs: [
              ...state.byId[action.payload.id].tabs,
              action.payload.tab
            ],
            ...state.byId[action.payload.id]
          },
          ...state.byId
        },
        ...state
      }
    case POCKET_UNASSIGN_TAB:
      console.log('UNASSIGN_TAB')
      console.log(action)
      console.log(state)
      return {
        byId: {
          [action.payload.id]: {
            tabs: filter(
              (tab) => tab !== action.payload.tab,
              state.byId[action.payload.id].tabs
            ),
            ...state.byId[action.payload.id]
          },
          ...state.byId
        },
        ...state
      }
    default:
      return state
  }
}

export default pocketReducer
