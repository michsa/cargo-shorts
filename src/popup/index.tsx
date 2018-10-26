import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createUIStore } from 'redux-webext'
import { requestTabInfo } from '../actions'
import PopupPocketList from './components/popup-pocket-list'
import TabInfo from './components/tab-info'

async function initApp() {
  const store = await createUIStore()
  store.dispatch(requestTabInfo())

  ReactDOM.render(
    <Provider store={store}>
      <TabInfo />
      <PopupPocketList/>
    </Provider>,
    document.getElementById('root') as HTMLElement
  )
}

initApp()
