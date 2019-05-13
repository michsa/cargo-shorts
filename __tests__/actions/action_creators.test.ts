import * as pocketActions from '../../src/redux/actions/pocket'
import * as tabActions from '../../src/redux/actions/tab'
import * as uiActions from '../../src/redux/actions/ui'
import { Pocket, PocketID, PocketSettings, SavedTab, Tab, TabID } from '../../src/types'

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

// --- ui actions --- //

describe('UI Actions', () => {

  it('newTab', () => {
    const payload: { tab: Tab, pocketId: PocketID } = {
      tab: tab, pocketId: pocket.id
    }
    expect(uiActions.newTab(payload)).toEqual({
      type: 'ui/NEW_TAB', payload
    })
  })

  it('moveTab', () => {
    const payload: { tabId: TabID, pocketId: PocketID, position?: number } = {
      tabId: savedTab.id, pocketId: pocket.id, position: 2
    }
    expect(uiActions.moveTab(payload)).toEqual({
      type: 'ui/MOVE_TAB', payload
    })
  })

  it('removeTab', () => {
    const payload: SavedTab = savedTab
    expect(uiActions.removeTab(payload)).toEqual({
      type: 'ui/REMOVE_TAB', payload
    })
  })

  it('requestCurrentTabInfo', () => {
    expect(uiActions.requestCurrentTabInfo()).toEqual({
      type: 'ui/REQUEST_CURRENT_TAB_INFO'
    })
  })

  it('updatePocketSettings', () => {
    const payload: { id: PocketID, settings: PocketSettings } = {
      id: pocket.id, settings: pocketSettings
    }
    expect(uiActions.updatePocketSettings(payload)).toEqual({
      type: 'ui/UPDATE_POCKET_SETTINGS', payload
    })
  })

  it('newPocket', () => {
    const payload: PocketSettings = pocketSettings
    expect(uiActions.newPocket(payload)).toEqual({
      type: 'ui/NEW_POCKET', payload
    })
  })

  it('movePocket', () => {
    const payload: { start: number, end: number } = {
      start: 1, end: 2
    }
    expect(uiActions.movePocket(payload)).toEqual({
      type: 'ui/MOVE_POCKET', payload
    })
  })

  it('deletePocket', () => {
    const payload: PocketID = pocket.id
    expect(uiActions.deletePocket(payload)).toEqual({
      type: 'ui/DELETE_POCKET', payload
    })
  })

  it('shufflePockets', () => {
    expect(uiActions.shufflePockets()).toEqual({
      type: 'ui/SHUFFLE_POCKETS'
    })
  })
})


// --- pocket actions --- //

describe('Pocket Actions', () => {

  it('newPocket', () => {
    const payload: { id: PocketID, settings: PocketSettings } = {
      id: pocket.id, settings: pocketSettings
    }
    expect(pocketActions.newPocket(payload)).toEqual({
      type: 'pocket/NEW', payload
    })
  })

  it('movePocket', () => {
    const payload: { start: number, end: number } = {
      start: 1, end: 5
    }
    expect(pocketActions.movePocket(payload)).toEqual({
      type: 'pocket/MOVE', payload
    })
  })

  it('deletePocket', () => {
    const payload: PocketID = pocket.id
    expect(pocketActions.deletePocket(payload)).toEqual({
      type: 'pocket/DELETE', payload
    })
  })

  it('updatePocket', () => {
    const payload: { id: PocketID, settings: PocketSettings } = {
      id: pocket.id, settings: pocketSettings
    }
    expect(pocketActions.updatePocket(payload)).toEqual({
      type: 'pocket/UPDATE', payload
    })
  })

  it('assignTab', () => {
    const payload: { pocketId: PocketID, tabId: TabID, position?: number } = {
      pocketId: pocket.id, tabId: savedTab.id, position: 4
    }
    expect(pocketActions.assignTab(payload)).toEqual({
      type: 'pocket/ASSIGN_TAB', payload
    })
  })

  it('unassignTab', () => {
    const payload: { pocketId: PocketID, tabId: TabID } = {
      pocketId: pocket.id, tabId: savedTab.id
    }
    expect(pocketActions.unassignTab(payload)).toEqual({
      type: 'pocket/UNASSIGN_TAB', payload
    })
  })

  it('shufflePockets', () => {
    expect(pocketActions.shufflePockets()).toEqual({
      type: 'pocket/SHUFFLE'
    })
  })
})


// --- tab actions --- //

describe('Tab Actions', () => {

  it('updateCurrentTab', () => {
    const payload: Tab | undefined = tab
    expect(tabActions.updateCurrentTab(payload)).toEqual({
      type: 'tab/UPDATE_CURRENT', payload
    })
  })

  it('newTab', () => {
    const payload: SavedTab = savedTab
    expect(tabActions.newTab(payload)).toEqual({
      type: 'tab/NEW', payload
    })
  })

  it('deleteTab', () => {
    const payload: TabID = savedTab.id
    expect(tabActions.deleteTab(payload)).toEqual({
      type: 'tab/DELETE', payload
    })
  })

  it('updateTabPocket', () => {
    const payload: { tabId: TabID, pocketId: PocketID } = {
      tabId: savedTab.id,
      pocketId: pocket.id
    }
    expect(tabActions.updateTabPocket(payload)).toEqual({
      type: 'tab/UPDATE_POCKET', payload
    })
  })

})
