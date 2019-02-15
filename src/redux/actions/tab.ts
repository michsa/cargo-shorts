import { action, createStandardAction } from 'typesafe-actions'
import * as uuid from 'uuid'
import { browser, Tabs } from 'webextension-polyfill-ts'

import { PocketID, SavedTab, Tab, TabID } from '../../types'

interface BrowserTab extends Tabs.Tab { }

export const updateCurrentTab = (tab: Tab | undefined) =>
  action('UPDATE_CURRENT_TAB', tab)

export const newTab = (payload: { tab: Tab, pocketId: PocketID }) =>
  action('NEW_TAB', { ...payload, tabId: uuid() })

export const newTab2 = (payload: { tab: Tab, pocketId: PocketID, tabId?: TabID }) =>
  action('NEW_TAB', payload.tabId ? payload : { ...payload, tabId: uuid() })


export const createAction = <P>(type: string, aux: ?????) => (payload: P) => 
  action(type, {...payload, aux})


export const newTab3 = createAction<{ tab: Tab, pocketId: PocketID, tabId?: TabID }>('NEW_TAB')

const newTabData1 = newTab3({ tab: {url: '', title: ''}, pocketId: '1', tabId: '2' })
const newTabData2 = newTab3({ tab: {url: '', title: ''}, pocketId: '1' })

export const moveTab = (payload: { tab: SavedTab, pocketId: PocketID, position?: number }) =>
  action('MOVE_TAB', payload)

export const moveTab2 = createStandardAction('MOVE_TAB')
  <{ tab: SavedTab, pocketId: PocketID, position?: number }>()


export const removeTab = (tab: SavedTab) =>
  action('REMOVE_TAB', { tab, foo: 'bar' })

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


const stripPayload2 = <Pout extends Pin, Pin>(fn: (arg: Pin) => { type: string, payload: Pout }) =>
  (payload: Pout) => fn(payload)

const test = stripPayload2(newTab)

test({ tab: { url: '', title: '' } as Tab, pocketId: '1', tabId: '2', foo: 'bar' })

const test2 = stripPayload2(newTab2)

