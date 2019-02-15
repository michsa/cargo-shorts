import { action } from 'typesafe-actions'
import * as uuid from 'uuid'
import { browser, Tabs } from 'webextension-polyfill-ts'

import { PocketID, SavedTab, Tab } from '../../types'

interface BrowserTab extends Tabs.Tab { }

export const updateCurrentTab = (tab: Tab | undefined) =>
  action('UPDATE_CURRENT_TAB', tab)

export const newTab = (tab: Tab, pocketId: PocketID) =>
  action('NEW_TAB', { tab, pocketId, tabId: uuid() })

export const moveTab = (tab: SavedTab, pocketId: PocketID, position?: number) =>
  action('MOVE_TAB', { tab, pocketId, position })

export const removeTab = (tab: SavedTab) =>
  action('REMOVE_TAB', tab)

export const requestCurrentTabInfo = () =>
  action('REQUEST_CURRENT_TAB_INFO')

// getTabInfo: executed from the background store in response to
// the API_REQUEST_TAB_INFO action (see store.tsx)
export const getCurrentTabInfo = () => {
  return async dispatch => {
    // dispatch({ type: API_REQUEST_TAB_INFO })
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
