import * as React from 'react'
import Snuggle from 'react-snuggle'
import { connect } from 'react-redux'

import { getOrderedPockets } from '../../redux/selectors'
import { Pocket, State } from '../../types'

import PocketListItem from './pocket-list-item'

interface Props {
  pockets: Pocket[]
}

const mapStateToProps = (state: State) => ({
  pockets: getOrderedPockets(state)
} as Props)

const PocketList = ({ pockets }: Props) => (
  <Snuggle className="pocket-list">
    {pockets.map((pocket) =>
      <PocketListItem
        pocket={pocket}
        key={pocket.id}
        handleEdit={(x) => x}
      />
    )}
  </Snuggle>
)

export default connect(mapStateToProps)(PocketList)
