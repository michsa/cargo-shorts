import * as React from 'react'
import { connect } from 'react-redux'

import { getOrderedPockets } from '../../redux/selectors'
import { Pocket, State } from '../../types'
import NewPocketButton from '../shared/new-pocket-button'

import PocketListItem from './pocket-list-item'

interface Props {
  pockets: Pocket[]
}

const mapStateToProps = (state: State) => ({
  pockets: getOrderedPockets(state)
} as Props)

const PocketList = ({ pockets }: Props) => (
  <ul className="pocket-list">
    {pockets.map((pocket) =>
      <PocketListItem
        pocket={pocket}
        key={pocket.id}
        handleEdit={(x) => x}
      />
    )}
    <li onClick={(x) => x}>
      <NewPocketButton />
    </li>
  </ul>
)

export default connect(mapStateToProps)(PocketList)
