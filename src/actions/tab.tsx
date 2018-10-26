import { UPDATE_CURRENT_TAB, REQUEST_TAB_INFO } from '../constants'
import { browser, Tabs } from 'webextension-polyfill-ts'
import { Tab } from '../types'

export const updateCurrentTab = (data: Tab) => ({
  type: UPDATE_CURRENT_TAB,
  payload: data
})

export const requestTabInfo = () => ({
  type: REQUEST_TAB_INFO
})

// getTabInfo: executed from the background store in response to 
// the REQUEST_TAB_INFO action (see store.tsx)
export const getTabInfo = () => {
  return async dispatch => {
    dispatch({type: REQUEST_TAB_INFO })
    try {
      const tabs: Tabs.Tab[] = await browser.tabs.query({active: true, currentWindow: true})
      if (tabs && tabs.length) {
        const tab = tabs[0]
        return dispatch(updateCurrentTab({url: tab.url, title: tab.title}))
      }
    } catch (err) {
      console.log(`error getting tab info: `, err.message)
    }
  }
}
