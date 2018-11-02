import { State, Pocket, Tab } from '../../types'
import { orderedPocketSelector, currentPocketIdSelector } from '../../selectors'
import { connect } from 'react-redux'
import { routeNewPocket, routeEditPocket } from '../../actions'

import * as React from 'react'
import PopupPocketListItem from './popup-pocket-list-item'
import TabInfo from './tab-info'

interface Props {
  pockets: Pocket[]
  currentPocket: string, // pocket id
  tab: Tab
}

const mapStateToProps = (state: State) => ({
    pockets: orderedPocketSelector(state),
    currentPocket: currentPocketIdSelector(state),
    tab: state.tabs.current
} as Props)

interface Handlers {
  handlers: {
    newPocket: () => void
    editPocket: (id: string) => void
  }
}

const mapDispatchToProps = dispatch => ({
  handlers: {
    newPocket: () => {
      dispatch(routeNewPocket())
    },
    editPocket: (id: string) => {
      dispatch(routeEditPocket(id))
    }
  }
})

const PopupPocketList = ({pockets, currentPocket, tab, handlers}: (Props & Handlers)) => (
  <ul id="pocket-list">
    <li><TabInfo/></li>
    {pockets.map((pocket) => 
      <PopupPocketListItem 
          pocket={pocket} 
          isActive={currentPocket === pocket.id} 
          editHandler={handlers.editPocket} 
          key={pocket.id}
      />
    )}
    <li onClick={handlers.newPocket}>+ New Pocket</li>
  </ul>
)

export default connect(mapStateToProps, mapDispatchToProps)(PopupPocketList)
