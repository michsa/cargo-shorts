import * as React from 'react'
import { connect } from 'react-redux'
import Snuggle from 'react-snuggle'

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
  <div className="pocket-list">
    <Snuggle columnWidth={300}>
      {pockets.map((pocket) =>
        <PocketListItem
          pocket={pocket}
          key={pocket.id}
          handleEdit={(x) => x}
        />
      )}
    </Snuggle>
  </div>
)

export default connect(mapStateToProps)(PocketList)
