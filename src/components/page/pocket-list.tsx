import * as React from 'react'
import { connect } from 'react-redux'

import { getOrderedPockets } from '../../redux/selectors'
import { Pocket, State } from '../../types'
import NewPocketButton from '../shared/new-pocket-button'
import { List } from '../shared/utils'

import PocketListItem from './pocket-list-item'

interface Props {
  pockets: Pocket[]
}

const mapStateToProps = (state: State) => ({
  pockets: getOrderedPockets(state)
} as Props)

const PocketList = ({ pockets }: Props) => (
  <List className="pocket-list">
    {pockets.map((pocket) =>
      <PocketListItem
        pocket={pocket}
        key={pocket.id}
        handleEdit={(x) => x}
      />
    )}
    <li>
      <NewPocketButton onClick={(x) => x} />
    </li>
  </List>
)

export default connect(mapStateToProps)(PocketList)
