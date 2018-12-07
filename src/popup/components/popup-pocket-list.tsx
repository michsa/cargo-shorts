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
  onPocketClick: (id: PocketID) => void
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onNewPocket: () => {
      dispatch(routeNewPocket())
    },
    onPocketEdit: (id: PocketID) => {
      dispatch(routeEditPocket(id))
    },
    onPocketClick: (id: PocketID) => {
      if (!ownProps.currentPocket) {
        dispatch(addTab(ownProps.tab))
      }
      else if (ownProps.currentPocket === id) {
        dispatch(unassignTab(ownProps.tab.id, id))
        dispatch(deleteTab(ownProps.tab.id))
      }
      else if (ownProps.currentPocket !== id) {
        dispatch(unassignTab(ownProps.tab.id, ownProps.currentPocket))
        dispatch(assignTab(ownProps.tab.id, id))
      }
    }
  }
}

const PopupPocketList = (props: Props, {onPocketClick, onPocketEdit, onNewPocket}: Handlers) => (
  <ul id="pocket-list">
    <li><TabInfo/></li>
    {props.pockets.map((pocket) =>
      <PopupPocketListItem
          pocket={pocket}
          isActive={props.currentPocket === pocket.id}
          key={pocket.id}
          handleClick={onPocketClick}
          handleEdit={onPocketEdit}
      />
    )}
    <li onClick={onNewPocket}>+ New Pocket</li>
  </ul>
)

export default connect(mapStateToProps, mapDispatchToProps)(PopupPocketList)
