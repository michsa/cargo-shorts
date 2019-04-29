import * as ui from '../src/redux/actions/ui'
import { Pocket, PocketID, PocketSettings, SavedTab, Tab } from '../src/types'

const tab: Tab = {
  favicon: "",
  title: "michsa.me",
  url: "https://michsa.me/"
}

const savedTab: SavedTab = {
  ...tab,
  id: "2x43itg",
  pocket: "h193iub"
}

const pocketSettings: PocketSettings = {
  name: "test",
  color: "#4caf50",
  icon: "🧜"
}
const pocket: Pocket = {
  ...pocketSettings,
  id: "m703ixt",
  tabs: []
}

describe('UI Actions', () => {

  it('newTab', () => {
    const payload: { tab: Tab, pocketId: PocketID } = {
      tab: tab,
      pocketId: pocket.id
    }
    expect(ui.newTab(payload)).toEqual({
      type: 'ui/NEW_TAB', payload
    })
  })

  it('moveTab', () => {
    const payload: { tab: SavedTab, pocketId: PocketID, position?: number } = {
      tab: savedTab,
      pocketId: pocket.id,
      position: 4
    }
    expect(ui.moveTab(payload)).toEqual({
      type: 'ui/MOVE_TAB', payload
    })
  })

  it('removeTab', () => {
    const payload: SavedTab = savedTab
    expect(ui.removeTab(payload)).toEqual({
      type: 'ui/REMOVE_TAB', payload
    })
  })

  it('requestCurrentTabInfo', () => {
    expect(ui.requestCurrentTabInfo()).toEqual({
      type: 'ui/REQUEST_CURRENT_TAB_INFO'
    })
  })

  it('updatePocketSettings', () => {
    const payload: { id: PocketID, settings: PocketSettings } = {
      id: pocket.id,
      settings: pocketSettings
    }
    expect(ui.updatePocketSettings(payload)).toEqual({
      type: 'ui/UPDATE_POCKET_SETTINGS', payload
    })
  })

  it('newPocket', () => {
    const payload: PocketSettings = pocketSettings
    expect(ui.newPocket(payload)).toEqual({
      type: 'ui/NEW_POCKET', payload
    })
  })
  
  it('movePocket', () => {
    const payload: { start: number, end: number } = {
      start: 1,
      end: 2
    }
    expect(ui.movePocket(payload)).toEqual({
      type: 'ui/MOVE_POCKET', payload
    })
  })

  it('deletePocket', () => {
    const payload: PocketID = pocket.id
    expect(ui.deletePocket(payload)).toEqual({
      type: 'ui/DELETE_POCKET', payload
    })
  })

  it('shufflePockets', () => {
    expect(ui.shufflePockets()).toEqual({
      type: 'ui/SHUFFLE_POCKETS'
    })
  })
})
