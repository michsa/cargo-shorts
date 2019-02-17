import { createStandardAction as create } from 'typesafe-actions'

import { Pocket, PocketID, SavedTab, Tab } from '../../types'

// --- ui actions --- //

export const newTab = create('ui/NEW_TAB')
  <{ tab: Tab, pocketId: PocketID}>()

export const moveTab = create('ui/MOVE_TAB')
  <{ tab: SavedTab, pocketId: PocketID, position?: number }>()

export const removeTab = create('ui/REMOVE_TAB')<SavedTab>()

export const requestCurrentTabInfo = create('ui/REQUEST_CURRENT_TAB_INFO')()

export const modifyPocket = create('ui/MODIFY_POCKET')<Pocket>()
