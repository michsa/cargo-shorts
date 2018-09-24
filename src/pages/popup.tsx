/// <reference path="../modules/redux-webext.d.ts"/>

import * as React from 'react'
//import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
//import { createUIStore } from 'redux-webext'
import PopupPocketList from '../components/popup-pocket-list'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { persistor, store } from '../stores'
// import './index.css';

/*
const pockets = [
  'My Pocket',
  'My Other Pocket',
  'Stuff',
  'Programming',
  'Misc'
]
*/

const App = () => (
  <Provider store={store}>
    <PersistGate loading={<div>{`loading!`}</div>} persistor={persistor}>
      <PopupPocketList/>
    </PersistGate>
  </Provider>
)

export default App

/*
async function initApp() {
  const store = await createUIStore()

  ReactDOM.render(
    <Provider store={store}>
      <PopupPocketList/>
    </Provider>,
    document.getElementById('root') as HTMLElement
  )
}

initApp()
*/