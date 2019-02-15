import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createUIStore } from 'redux-webext'

import App from './components/popup/app'
import { requestCurrentTabInfo } from './redux/actions'


async function initApp() {
  const store = await createUIStore()
  store.dispatch(requestCurrentTabInfo())

  ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
    document.getElementById('root') as HTMLElement
  )
}

initApp()
