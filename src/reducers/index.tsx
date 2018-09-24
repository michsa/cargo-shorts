import pocketReducer from './pocket'
import tabReducer from './tab'
import { combineReducers } from 'redux'

const reducer = combineReducers({
  pocket: pocketReducer,
  tab: tabReducer
})

export default reducer
