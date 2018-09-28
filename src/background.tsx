import backgroundStore from './redux/store'
// import browser from 'webextension-polyfill'
// window.browser = browser
// import { getTabInfo } from './redux/actions'

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