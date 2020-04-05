import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createUIStore } from 'redux-webext'

import App from './components/page/app'
import { requestCurrentTabInfo } from './redux/actions/ui'

async function initApp() {
  const store = await createUIStore()
  console.log('store as of page:')
  console.log(store.getState())
  console.log('------------------')
  store.dispatch(requestCurrentTabInfo())

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root') as HTMLElement
  )
}

initApp()
