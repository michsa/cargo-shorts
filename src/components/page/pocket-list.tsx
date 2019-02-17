import * as React from 'react'
import { connect } from 'react-redux'

import { orderedPocketSelector } from '../../redux/selectors'
import { Pocket, PocketID, State } from '../../types'

import PocketListItem from './pocket-list-item'

interface Props {
  pockets: Pocket[]
}

const mapStateToProps = (state: State) => ({
  pockets: orderedPocketSelector(state)
} as Props)

interface Handlers {
  onNewPocket: () => void
  onPocketEdit: (id: PocketID) => void
}

const mapDispatchToProps = (dispatch) => ({
  onNewPocket: () => {
    console.log('new pocket!')
    // dispatch(routeNewPocket())
  },
  onPocketEdit: (pocketId) => {
    console.log(`pocket edit: ${pocketId}`)
    // dispatch(routeEditPocket(pocketId))
  }
} as Handlers)

const PocketListComponent = ({pockets}: Props & Handlers) => (
    <ul id="pocket-list">
      {pockets.map((pocket) =>
        <PocketListItem
          pocket={pocket}
          key={pocket.id}
          handleEdit={(x) => x}
        />
      )}
      <li onClick={(x) => x}>+ New Pocket</li>
    </ul>
  )

export default connect(mapStateToProps, mapDispatchToProps)(PocketListComponent)
