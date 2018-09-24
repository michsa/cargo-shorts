import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import { localStorage } from 'redux-persist-webextension-storage'
// import { createBackgroundStore } from 'redux-webext'
import reducer from '../reducers'

const persistConfig = {
    key: 'root',
    storage: localStorage
}

const pReducer = persistReducer(persistConfig, reducer)

export const store = createStore(pReducer)
export const persistor = persistStore(store)

/*
export default createBackgroundStore({
    store, persistStore(store)
})
*/