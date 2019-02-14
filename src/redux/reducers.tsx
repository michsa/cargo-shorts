import pockets from './pockets/reducers'
import tabs from './tabs/reducers'
import router from './router/reducers'
import { combineReducers } from 'redux'

export default combineReducers({ router, pockets, tabs })
