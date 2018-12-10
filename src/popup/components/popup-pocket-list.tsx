import { State, Pocket, Tab, PocketID } from '../../types'
import { orderedPocketSelector, currentPocketIdSelector } from '../../selectors'
import { connect } from 'react-redux'
import { routeNewPocket, routeEditPocket, 
         addTab, assignTab, 
         deleteTab, unassignTab } from '../../actions'

import * as React from 'react'
import PopupPocketListItem from './popup-pocket-list-item'
import TabInfo from './tab-info'

interface Props {
  pockets: Pocket[],
  currentPocket: PocketID, // pocket id
  tab: Tab
}

const mapStateToProps = (state: State) => ({
    pockets: orderedPocketSelector(state),
    currentPocket: currentPocketIdSelector(state),
    tab: state.tabs.current
} as Props)

interface Handlers {
  onNewPocket: () => void
  onPocketEdit: (id: PocketID) => void,
  onPocketClick: (id: PocketID, currentPocket: PocketID, tab: Tab) => void
}

const mapDispatchToProps = (dispatch) => {
  return {
    onNewPocket: () => {
      console.log('new pocket!')
      dispatch(routeNewPocket())
    },
    onPocketEdit: (id: PocketID) => {
      console.log(`pocket edit: ${id}`)
      dispatch(routeEditPocket(id))
    },
    onPocketClick: (id: PocketID, currentPocket: PocketID, tab: Tab) => {
      console.log(`pocket click! id: ${id}, current: ${currentPocket}, tab:`)
      console.log(tab)
      if (!currentPocket) {
        dispatch(addTab(tab))
      }
      else if (currentPocket === id) {
        dispatch(unassignTab(tab.id, id))
        dispatch(deleteTab(tab.id))
      }
      else if (currentPocket !== id) {
        dispatch(unassignTab(tab.id, currentPocket))
        dispatch(assignTab(tab.id, id))
      }
    }
  }
}

const PopupPocketList = ({pockets, currentPocket, tab, onPocketClick, onPocketEdit, onNewPocket}: Props & Handlers) => (
  <ul id="pocket-list">
    <li><TabInfo tab={tab}/></li>
    {pockets.map((pocket) =>
      <PopupPocketListItem
          pocket={pocket}
          isActive={currentPocket === pocket.id}
          key={pocket.id}
          handleClick={(id: PocketID) => onPocketClick(id, currentPocket, tab)}
          handleEdit={onPocketEdit}
      />
    )}
    <li onClick={onNewPocket} style={{backgroundColor: '#fdd'}}>+ New Pocket</li>
  </ul>
)

export default connect(mapStateToProps, mapDispatchToProps)(PopupPocketList)
