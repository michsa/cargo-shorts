import backgroundStore from './store'
// import browser from 'webextension-polyfill'
// window.browser = browser
import { requestTabInfo } from './actions/tab'

console.log('background.tsx')
console.log(backgroundStore.getState())

backgroundStore.dispatch(requestTabInfo)

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
