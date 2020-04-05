import { createAction as create } from 'typesafe-actions'

import { PocketID, PocketSettings, SavedTab, Tab, TabID } from '../../types'

// --- browser api stuff --- //

export const requestCurrentTabInfo = create('ui/REQUEST_CURRENT_TAB_INFO')()

// --- tab stuff --- //

export const newTab = create('ui/NEW_TAB')<{ tab: Tab; pocketId: PocketID }>()

export const moveTab = create('ui/MOVE_TAB')<{
  tabId: TabID
  pocketId: PocketID
  position?: number
}>()

export const removeTab = create('ui/REMOVE_TAB')<SavedTab>()

// --- pocket stuff --- //

export const newPocket = create('ui/NEW_POCKET')<PocketSettings>()

export const updatePocketSettings = create('ui/UPDATE_POCKET_SETTINGS')<{
  id: PocketID
  settings: PocketSettings
}>()

export const movePocket = create('ui/MOVE_POCKET')<{
  start: number
  end: number
}>()

export const reorderPockets = create('ui/REORDER_POCKETS')<PocketID[]>()

export const deletePocket = create('ui/DELETE_POCKET')<PocketID>()

export const shufflePockets = create('ui/SHUFFLE_POCKETS')()
