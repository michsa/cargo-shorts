import { State, Route } from '../../types'
import { orderedPocketSelector } from '../../selectors'
import { connect } from 'react-redux'
import { route } from '../../actions'

import * as React from 'react'
import PopupPocketListItem from './popup-pocket-list-item'

const mapStateToProps = (state: State) => ({
    pockets: orderedPocketSelector(state),
    tab: state.tabs.current
})

const mapDispatchToProps = dispatch => ({
  onClick: id => {
    dispatch(route(Route.NEW_POCKET))
  }
})

const PopupPocketList = ({pockets, onClick}) => (
  <ul>
    {pockets.map((pocket, index) => 
      <PopupPocketListItem pocket={pocket} key={index}/>
    )}
    <li onClick={onClick}>+ New Pocket</li>
  </ul>
)

export default connect(mapStateToProps, mapDispatchToProps)(PopupPocketList)
