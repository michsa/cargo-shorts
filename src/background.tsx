// import browser from 'webextension-polyfill'
// window.browser = browser
// import { requestCurrentTabInfo } from './redux/actions'
import backgroundStore from './redux/store'

console.log('background.tsx')
console.log(backgroundStore.getState())

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
