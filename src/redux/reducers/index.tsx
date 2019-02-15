import { combineReducers } from 'redux'

import pockets from './pocket'
import router from './route'
import tabs from './tab'

export default combineReducers({ router, pockets, tabs })
