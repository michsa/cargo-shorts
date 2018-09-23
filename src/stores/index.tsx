import { createStore } from 'redux'
import { createBackgroundStore } from 'redux-webext'
import reducer from './reducers'
import { State } from '../constants'

const initialState: State = {
    pockets: {},
    items: {},
    pocketList: []
}

const store = createStore(reducer, initialState)

export default createBackgroundStore({
    store
})
