/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useState } from 'react'
import { connect } from 'react-redux'
import { XMasonry, XBlock } from 'react-xmasonry'

import { getOrderedPockets } from '../../redux/selectors'
import { Pocket, State } from '../../types'

import PocketListItem from './pocket-list-item'

interface Props {
  pockets: Pocket[]
}

const mapStateToProps = (state: State) =>
  ({ pockets: getOrderedPockets(state) } as Props)

const PocketList = ({ pockets }: Props) => {
  const [grid, setGrid] = useState()
  return (
    <XMasonry
      ref={setGrid}
      smartUpdate={false}
      targetBlockWidth={400}
      maxColumns={4}
    >
      {pockets.map(pocket => (
        <XBlock key={pocket.id}>
          <PocketListItem pocket={pocket} grid={grid} handleEdit={x => x} />
        </XBlock>
      ))}
    </XMasonry>
  )
}

export default connect(mapStateToProps)(PocketList)
