import { State, Pocket, SavedTab, Tab, PocketID } from '../../types'
import { orderedPocketSelector, currentTabSelector, currentTabInfoSelector } from '../../selectors'
import { connect } from 'react-redux'
import {
  routeNewPocket, routeEditPocket,
  addTab, assignTab, removeTab
} from '../../actions'

import * as React from 'react'
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
      dispatch(addTab(tab, pocketId))
    }
    else if (savedTab.pocket === pocketId) {
      dispatch(removeTab(savedTab.id))
    }
    else if (savedTab.pocket !== pocketId) {
      dispatch(assignTab(savedTab.id, pocketId))
    }
  }
} as Handlers)

const PopupPocketList = ({
  pockets, savedTab, tab,
  onPocketClick, onPocketEdit, onNewPocket
}: Props & Handlers) => (
    <ul id="pocket-list">
      <li><TabInfo tab={tab} /></li>
      {pockets.map((pocket) =>
        <PopupPocketListItem
          pocket={pocket}
          isActive={!!savedTab && savedTab.id === pocket.id}
          key={pocket.id}
          handleClick={(id: PocketID) => onPocketClick(id, tab, savedTab)}
          handleEdit={onPocketEdit}
        />
      )}
      <li onClick={onNewPocket} style={{ backgroundColor: '#fdd' }}>+ New Pocket</li>
    </ul>
  )

export default connect(mapStateToProps, mapDispatchToProps)(PopupPocketList)
