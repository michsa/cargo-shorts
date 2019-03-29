import { createStandardAction as create } from 'typesafe-actions'

import { PocketID, PocketSettings, SavedTab, Tab } from '../../types'

// --- ui actions --- //

export const newTab = create('ui/NEW_TAB')
  <{ tab: Tab, pocketId: PocketID }>()

export const moveTab = create('ui/MOVE_TAB')
  <{ tab: SavedTab, pocketId: PocketID, position?: number }>()

export const removeTab = create('ui/REMOVE_TAB')<SavedTab>()

export const requestCurrentTabInfo = create('ui/REQUEST_CURRENT_TAB_INFO')()

export const updatePocketSettings = create('ui/UPDATE_POCKET_SETTINGS')
  <{ id: PocketID, settings: PocketSettings }>()

export const newPocket = create('ui/NEW_POCKET')<PocketSettings>()

export const deletePocket = create('ui/DELETE_POCKET')<PocketID>()

export const shufflePockets = create('ui/SHUFFLE_POCKETS')()
