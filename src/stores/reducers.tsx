// import { combineReducers } from 'redux'
import { ActionType } from 'typesafe-actions'
import { State } from '../constants'
import { ADD_POCKET, DELETE_POCKET, MODIFY_POCKET } from '../constants'

import * as actions from '../actions'
export type Action = ActionType<typeof actions>

export default (state: State, action: Action): State => {
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


/* export default combineReducers({
    backgroundCounter: createCounterReducer(INCREMENT_BACKGROUND_COUNTER, DECREMENT_BACKGROUND_COUNTER),
    uiCounter: createCounterReducer(INCREMENT_UI_COUNTER, DECREMENT_UI_COUNTER)
})
*/
