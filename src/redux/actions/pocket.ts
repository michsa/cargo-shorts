import { createAction as create } from 'typesafe-actions'

import { PocketID, PocketSettings, TabID } from '../../types'

export const newPocket = create('pocket/NEW')<{
  id: PocketID
  settings: PocketSettings
}>()

export const deletePocket = create('pocket/DELETE')<PocketID>()

export const updatePocket = create('pocket/UPDATE')<{
  id: PocketID
  settings: PocketSettings
}>()

export const assignTab = create('pocket/ASSIGN_TAB')<{
  pocketId: PocketID
  tabId: TabID
  position?: number
}>()

export const unassignTab = create('pocket/UNASSIGN_TAB')<{
  pocketId: PocketID
  tabId: TabID
}>()

export const moveTab = create('pocket/MOVE_TAB')<{
  pocketId: PocketID
  tabId: TabID
  position?: number
  oldPocketId: PocketID
}>()

export const shufflePockets = create('pocket/SHUFFLE')()

export const movePocket = create('pocket/MOVE')<{
  start: number
  end: number
}>()

export const reorderPockets = create('pocket/REORDER')<PocketID[]>()
