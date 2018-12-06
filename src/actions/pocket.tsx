import { action } from 'typesafe-actions'
import { ADD_POCKET, DELETE_POCKET, MODIFY_POCKET } from '../constants'
import { Pocket, PocketID } from '../types'

export const addPocket = (pocket: Pocket) => action(ADD_POCKET, pocket)

export const deletePocket = (id: PocketID) => action(DELETE_POCKET, id)

export const modifyPocket = (data: {id: PocketID, pocket: Pocket}) => action(MODIFY_POCKET, data)
