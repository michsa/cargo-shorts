import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createUIStore } from 'redux-webext'
import { requestTabInfo } from './actions'
import PopupPocketList from './components/popup-pocket-list'
// import './index.css';

async function initApp() {
  const store = await createUIStore()
  console.log(store.getState())
  
  store.dispatch(requestTabInfo())
  console.log(store.getState())

  ReactDOM.render(
    <Provider store={store}>
      <PopupPocketList/>
    </Provider>,
    document.getElementById('root') as HTMLElement
  )
}

initApp()
