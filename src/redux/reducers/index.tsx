import pocketReducer from './pocket'
import tabReducer from './tab'
import { combineReducers } from 'redux'

const reducer = combineReducers({
  pockets: pocketReducer,
  tabs: tabReducer
})

export default reducer
