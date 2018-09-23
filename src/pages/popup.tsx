/// <reference path="../modules/redux-webext.d.ts"/>

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createUIStore } from 'redux-webext'
import PopupPocketList from '../components/popup-pocket-list'
// import './index.css';

const pockets = [
  'My Pocket',
  'My Other Pocket',
  'Stuff',
  'Programming',
  'Misc'
]

async function initApp() {
  const store = await createUIStore()

  ReactDOM.render(
    <Provider store={store}>
      <PopupPocketList pockets={pockets}/>
    </Provider>,
    document.getElementById('root') as HTMLElement
  )
}

initApp()
