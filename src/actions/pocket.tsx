import { action } from 'typesafe-actions'
import { ADD_POCKET, DELETE_POCKET, MODIFY_POCKET, ASSIGN_TAB, UNASSIGN_TAB } from '../constants'
import { Pocket, PocketID, TabID } from '../types'
import { v4 as uuid } from 'uuid'

export const addPocket = 
    (pocket: Pocket) => 
        action(ADD_POCKET, {id: uuid(), data: pocket})

export const deletePocket = 
    (id: PocketID) => 
        action(DELETE_POCKET, id)

export const modifyPocket = 
    (pocket: Pocket) => 
        action(MODIFY_POCKET, {pocket})

export const assignTab = 
    (id: PocketID, tab: TabID) => 
        action(ASSIGN_TAB, {id, tab})

export const unassignTab = 
    (id: PocketID, tab: TabID) => 
        action(UNASSIGN_TAB, {id, tab})
