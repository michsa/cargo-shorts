import { createStore } from 'redux'
import { createBackgroundStore } from 'redux-webext'
import reducer from '../reducers'

const store = createStore(reducer);

export default createBackgroundStore({
    store,
    actions: {}
});