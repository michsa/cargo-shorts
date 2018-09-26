/// <reference path="../modules/redux-webext.d.ts"/>

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createUIStore } from 'redux-webext'
import PopupPocketList from '../components/popup-pocket-list'
// import './index.css';

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
