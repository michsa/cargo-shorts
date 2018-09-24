import { createAction } from 'typesafe-actions'
// import { ADD_TAB, DELETE_TAB, ASSIGN_TAB, REORDER_TAB } from '../constants'

export const add = createAction('tab/ADD', resolve => {
  return (payload: {title: string, url: string}) => resolve(payload)
})

//export const addTab = (pocket: Pocket) => action(ADD_TAB, pocket)

//export const deleteTab = (id: string) => action(DELETE_TAB, id)

//export const modifyTab = (data: {id: string, pocket: Pocket}) => action(MODIFY_POCKET, data)
