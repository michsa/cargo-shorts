// import { createAction } from 'typesafe-actions'
import { UPDATE_CURRENT_TAB } from '../../constants'
import { browser } from 'webextension-polyfill-ts'
import { Tab } from '../../types'

/*
export const add = createAction('tab/ADD', resolve => {
  return (payload: {title: string, url: string}) => resolve(payload)
})
*/

export const updateCurrentTab = (data: Tab) => ({
  type: UPDATE_CURRENT_TAB,
  payload: data
})

export const getTabInfo = () => {
  return async dispatch => {
    try {
      const tab = await browser.tabs.getCurrent()
      return dispatch(updateCurrentTab({url: tab.url, title: tab.title}))
    } catch (err) {
      console.log(`error getting tab info `, err.message)
      return dispatch(updateCurrentTab({}))
    }
  }
}

//export const addTab = (pocket: Pocket) => action(ADD_TAB, pocket)

//export const deleteTab = (id: string) => action(DELETE_TAB, id)

//export const modifyTab = (data: {id: string, pocket: Pocket}) => action(MODIFY_POCKET, data)
