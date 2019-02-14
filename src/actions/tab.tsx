import { TAB_UPDATE_CURRENT, API_REQUEST_TAB_INFO, TAB_ADD, TAB_DELETE, NEW_TAB, REMOVE_TAB } from '../constants'
import { browser, Tabs } from 'webextension-polyfill-ts'
import { Tab, TabID, PocketID } from '../types'
// import { v4 as uuid } from 'uuid'
interface BrowserTab extends Tabs.Tab { }

export const newTab = (tab: Tab, pocketId: PocketID) => ({
  type: NEW_TAB,
  payload: { tab, pocketId }
})

export const addTab = (tab: Tab) => ({
  type: TAB_ADD,
  payload: tab
})

export const deleteTab = (id: TabID) => ({
  type: TAB_DELETE,
  payload: id
})

export const updateCurrentTab = (tab: Tab | undefined) => ({
  type: TAB_UPDATE_CURRENT,
  payload: tab
})

export const requestTabInfo = () => ({
  type: API_REQUEST_TAB_INFO
})

// getTabInfo: executed from the background store in response to 
// the API_REQUEST_TAB_INFO action (see store.tsx)
export const getTabInfo = () => {
  return async dispatch => {
    dispatch({ type: API_REQUEST_TAB_INFO })
    try {
      const tabs: BrowserTab[] = await browser.tabs.query({
        active: true, currentWindow: true
      })
      if (tabs && tabs.length) {
        const browserTab: BrowserTab = tabs[0]
        const tab: Tab | undefined = browserTab.url && browserTab.title ?
          { url: browserTab.url, title: browserTab.title } : undefined
        return dispatch(updateCurrentTab(tab))
      }
    } catch (err) {
      console.log(`error getting tab info: `, err.message)
    }
  }
}
