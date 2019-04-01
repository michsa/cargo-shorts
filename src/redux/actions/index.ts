import { slug as id } from 'cuid'
import { Dispatch } from 'redux'
import { ActionType } from 'typesafe-actions'
import { browser, Tabs } from 'webextension-polyfill-ts'

import { Tab } from '../../types'
import { getTabIdListForPocket } from '../selectors'

import * as pocketActions from './pocket'
import * as tabActions from './tab'
import * as ui from './ui'

interface BrowserTab extends Tabs.Tab { }

export { shufflePockets } from './pocket'

export const getCurrentTabInfo = () => {
  return async (dispatch: Dispatch<ActionType<
    typeof tabActions.updateCurrentTab
  >>) => {
    try {
      const tabs: BrowserTab[] = await browser.tabs.query({
        active: true, currentWindow: true
      })
      if (tabs && tabs.length) {
        const browserTab: BrowserTab = tabs[0]
        const tab: Tab | undefined = browserTab.url ? {
          url: browserTab.url,
          title: browserTab.title || '',
          favicon: browserTab.favIconUrl || ''
        } : undefined
        dispatch(tabActions.updateCurrentTab(tab))
      }
    } catch (err) {
      console.log(`error getting tab info: `, err.message)
    }
  }
}

export const newTab = (
  { payload }: ActionType<typeof ui.newTab>
) => {
  return (dispatch: Dispatch<ActionType<
    typeof tabActions.newTab
    | typeof pocketActions.assignTab
  >>) => {
    const newTabId = id()
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
  { payload }: ActionType<typeof ui.removeTab>
) => {
  return (dispatch: Dispatch<ActionType<
    typeof pocketActions.unassignTab
    | typeof tabActions.deleteTab
  >>) => {
    dispatch(pocketActions.unassignTab({
      pocketId: payload.pocket,
      tabId: payload.id
    }))
    dispatch(tabActions.deleteTab(payload.id))
  }
}

export const moveTab = (
  { payload }: ActionType<typeof ui.moveTab>
) => {
  return (dispatch: Dispatch<ActionType<
    typeof pocketActions.unassignTab
    | typeof pocketActions.assignTab
    | typeof tabActions.updateTabPocket
  >>) => {
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

export const updatePocketSettings = (
  { payload }: ActionType<typeof ui.updatePocketSettings>
) => pocketActions.updatePocket(payload)

export const newPocket = (
  { payload }: ActionType<typeof ui.newPocket>
) => {
  const pocketId = id()
  return pocketActions.newPocket({ id: pocketId, settings: payload })
}

export const deletePocket = (
  { payload }: ActionType<typeof ui.deletePocket>
) => {
  return (dispatch: Dispatch<ActionType<
    typeof pocketActions.deletePocket
    | typeof tabActions.deleteTab
  >>, getState) => {
    const tabIds = getTabIdListForPocket(getState(), payload)
    for (const tabId of tabIds) {
      dispatch(tabActions.deleteTab(tabId))
    }
    dispatch(pocketActions.deletePocket(payload))
  }
}
