import { NEW_TAB } from '../constants'

export * from './router'
export * from './tab'
export * from './pocket'

export const newTab = (tab: Tab, pocketId: PocketID) => ({
  type: NEW_TAB,
  payload: { tab, pocketId }
})

