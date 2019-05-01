import { createStandardAction as create } from 'typesafe-actions'

import { PocketID, SavedTab, Tab, TabID } from '../../types'


export const updateCurrentTab = create('tab/UPDATE_CURRENT')
  <Tab | undefined>()

export const deleteTab = create('tab/DELETE')
  <TabID>()

export const newTab = create('tab/NEW')
  <SavedTab>()

export const updateTabPocket = create('tab/UPDATE_POCKET')
  <{tabId: TabID, pocketId: PocketID}>()
