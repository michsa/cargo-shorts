import { State } from '../../types'
import { orderedPocketSelector } from '../../selectors'
import { connect } from 'react-redux'
import { routeNewPocket, routeEditPocket } from '../../actions'

import * as React from 'react'
import PopupPocketListItem from './popup-pocket-list-item'
import TabInfo from './tab-info'

const mapStateToProps = (state: State) => ({
    pockets: orderedPocketSelector(state),
    tab: state.tabs.current
})

const mapDispatchToProps = dispatch => ({
  handlers: {
    newPocket: id => {
      dispatch(routeNewPocket())
    },
    editPocket: id => {
      dispatch(routeEditPocket(id))
    }
  }
})

const PopupPocketList = ({pockets, handlers}) => (
  <ul id="pocket-list">
    <li><TabInfo/></li>
    {pockets.map((pocket, index) => 
      <li id="pocket-list-item">
        <PopupPocketListItem pocket={pocket} key={index} isActive={index % 2 === 0} />
        <i id="edit-pocket" className="ui icon pencil" onClick={handlers.editPocket} />
      </li>
    )}
    <li onClick={handlers.newPocket}>+ New Pocket</li>
  </ul>
)

export default connect(mapStateToProps, mapDispatchToProps)(PopupPocketList)
