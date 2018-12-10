import { UPDATE_CURRENT_TAB, REQUEST_TAB_INFO, ADD_TAB, DELETE_TAB } from '../constants'
import { browser, Tabs } from 'webextension-polyfill-ts'
import { Tab, TabID } from '../types'
import { v4 as uuid } from 'uuid'
interface BrowserTab extends Tabs.Tab {}

export const addTab = (tab: Tab) => {
  console.log(`add tab action creator`)
  console.log(tab)
  return {
  type: ADD_TAB,
  payload: tab
  }
}

export const deleteTab = (id: TabID) => ({
  type: DELETE_TAB,
  payload: id
})

export const updateCurrentTab = (tab: Tab | undefined) => ({
  type: UPDATE_CURRENT_TAB,
  payload: tab
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
      const tabs: BrowserTab[] = await browser.tabs.query({
        active: true, currentWindow: true
      })
      if (tabs && tabs.length) {
        const browserTab: BrowserTab = tabs[0]
        const tab: Tab | undefined = browserTab.url && browserTab.title ? 
            {url: browserTab.url, title: browserTab.title, id: uuid()} : undefined
        return dispatch(updateCurrentTab(tab))
      }
    } catch (err) {
      console.log(`error getting tab info: `, err.message)
    }
  }
}
