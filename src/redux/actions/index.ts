import { ActionType } from 'typesafe-actions'
import { v4 as uuid } from 'uuid'
import { browser, Tabs } from 'webextension-polyfill-ts'

import { Tab } from '../../types'

import * as pocketActions from './pocket'
import * as tabActions from './tab'
import * as uiActions from './ui'

interface BrowserTab extends Tabs.Tab { }

// --- thunks --- //

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
        return dispatch(tabActions.updateCurrentTab(tab))
      }
    } catch (err) {
      console.log(`error getting tab info: `, err.message)
    }
  }
}

export const newTab = (
  { payload }: ActionType<typeof uiActions.newTab>
) => {
  return dispatch => {
    const newTabId = uuid()
    dispatch(tabActions.newTab({
      ...payload.tab,
      id: newTabId,
      pocket: payload.pocketId
    }))
    dispatch(pocketActions.assignTab({
      pocketId: payload.pocketId,
      tabId: newTabId
    }))
  }
}

export const removeTab = (
  { payload }: ActionType<typeof uiActions.removeTab>
) => {
  return dispatch => {
    dispatch(pocketActions.unassignTab({
      pocketId: payload.pocket,
      tabId: payload.id
    }))
    dispatch(tabActions.deleteTab(payload.id))
  }
}

export const moveTab = (
  { payload }: ActionType<typeof uiActions.moveTab>
) => {
  return dispatch => {
    dispatch(pocketActions.unassignTab({
      pocketId: payload.tab.pocket,
      tabId: payload.tab.id
    }))
    dispatch(pocketActions.assignTab({
      pocketId: payload.pocketId,
      tabId: payload.tab.id
    }))
    dispatch(tabActions.updateTabPocket({
      pocketId: payload.pocketId,
      tabId: payload.tab.id
    }))
  }
}
