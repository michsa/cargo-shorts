// import browser from 'webextension-polyfill'

import backgroundStore from './redux/store'

console.log(backgroundStore.getState())

/*
async function resetStorageData() {
  const data = await browser.storage.sync.clear()
  console.log(data)
}

resetStorageData()
*/
