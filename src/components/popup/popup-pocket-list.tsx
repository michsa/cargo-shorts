import * as React from 'react'
import { connect } from 'react-redux'


import { moveTab, newTab, removeTab, routeEditPocket, routeNewPocket } from '../../redux/actions'
import { currentTabInfoSelector, currentTabSelector, orderedPocketSelector } from '../../redux/selectors'
import { Pocket, PocketID, SavedTab, State, Tab } from '../../types'

import PopupPocketListItem from './popup-pocket-list-item'
import TabInfo from './tab-info'

interface Props {
  pockets: Pocket[],
  savedTab: SavedTab | undefined,
  tab: Tab
}

const mapStateToProps = (state: State) => ({
  pockets: orderedPocketSelector(state),
  savedTab: currentTabSelector(state),
  tab: currentTabInfoSelector(state)
} as Props)

interface Handlers {
  onNewPocket: () => void
  onPocketEdit: (id: PocketID) => void,
  onPocketClick: (
    pocketId: PocketID,
    tab: Tab,
    savedTab: SavedTab | undefined
  ) => void
}

const mapDispatchToProps = (dispatch) => ({
  onNewPocket: () => {
    console.log('new pocket!')
    dispatch(routeNewPocket())
  },
  onPocketEdit: (pocketId) => {
    console.log(`pocket edit: ${pocketId}`)
    dispatch(routeEditPocket(pocketId))
  },
  onPocketClick: (pocketId, tab, savedTab) => {
    if (!savedTab) {
      dispatch(newTab(tab, pocketId))
    }
    else if (savedTab.pocket === pocketId) {
      dispatch(removeTab(savedTab))
    }
    else if (savedTab.pocket !== pocketId) {
      dispatch(moveTab(savedTab, pocketId))
    }
  }
} as Handlers)

const PopupPocketList = ({
  pockets, savedTab, tab,
  onPocketClick, onPocketEdit, onNewPocket
}: Props & Handlers) => {
  return (
    <ul id="pocket-list">
      <li><TabInfo tab={tab} /></li>
      {pockets.map((pocket) =>
        <PopupPocketListItem
          pocket={pocket}
          isActive={!!savedTab && savedTab.pocket === pocket.id}
          key={pocket.id}
          handleClick={(id: PocketID) => onPocketClick(id, tab, savedTab)}
          handleEdit={onPocketEdit}
        />
      )}
      <li onClick={onNewPocket}>+ New Pocket</li>
    </ul>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(PopupPocketList)
