import { POCKET_ADD, POCKET_DELETE, POCKET_MODIFY, POCKET_ASSIGN_TAB, POCKET_UNASSIGN_TAB } from '../constants'
import { Pocket, PocketID, TabID } from '../types'

const action = (type: string, payload: T) => ({type, payload})

export const addPocket =
  (pocket: Pocket) =>
    action(POCKET_ADD, pocket)

export const deletePocket =
  (id: PocketID) =>
    action(POCKET_DELETE, id)

export const modifyPocket =
  (pocket: Pocket) =>
    action(POCKET_MODIFY, pocket)

export const modifyPocket2 =
  (pocket: Pocket) => ({
    type: POCKET_MODIFY,
    payload: pocket
  })

export const assignTab =
  (id: PocketID, tab: TabID) => {
    console.log(`assign tab | id: ${id} | tab: ${tab}`)
    return action(POCKET_ASSIGN_TAB, { id, tab })
  }

export const unassignTab =
  (id: PocketID, tab: TabID) =>
    action(POCKET_UNASSIGN_TAB, { id, tab })
