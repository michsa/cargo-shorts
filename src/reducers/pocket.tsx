// import { combineReducers } from 'redux'
import { PocketState, PocketMap } from '../types'
import { filter } from 'lodash'
import { ASSIGN_TAB, UNASSIGN_TAB } from '../constants'

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
  switch (action.type) {
    case ASSIGN_TAB:
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
    case UNASSIGN_TAB:
      console.log('UNASSIGN_TAB')
      console.log(action)
      console.log(state)
      return {
        byId: {
          [action.payload.id]: {
            tabs: filter(
              state.byId[action.payload.id].tabs,
              (tab) => tab !== action.payload.tab
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
