import { createStandardAction as create } from 'typesafe-actions'

import { Pocket, PocketID, TabID } from '../../types'

export const newPocket = create('pocket/NEW')<Pocket>()

export const deletePocket = create('pocket/DELETE')<PocketID>()

export const modifyPocket = create('pocket/MODIFY')<Pocket>()

export const assignTab = create('pocket/ASSIGN_TAB')
  <{pocketId: PocketID, tabId: TabID, position?: number}>()

export const unassignTab = create('pocket/UNASSIGN_TAB')
  <{pocketId: PocketID, tabId: TabID}>()
