import backgroundStore from './redux/store'
// import browser from 'webextension-polyfill'
// window.browser = browser
import { requestCurrentTabInfo } from './redux/actions'

console.log('background.tsx')
console.log(backgroundStore.getState())

backgroundStore.dispatch(requestCurrentTabInfo)

/*
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/app'

if (document.getElementById('root')) {
  ReactDOM.render(
    <Provider store={backgroundStore}>
      <App />
    </Provider>,
    document.getElementById('root') as HTMLElement
  )
}
*/

/*
async function loadStorageData() {
  const data = await browser.storage.sync.get()

  backgroundStore.dispatch({
    type: 'LOAD_STORAGE_DATA',
    data
  })
}

loadStorageData()
*/
