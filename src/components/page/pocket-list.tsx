/** @jsx jsx */
import { jsx } from '@emotion/core'
import { connect } from 'react-redux'
import { XMasonry, XBlock } from 'react-xmasonry'

import { getOrderedPockets } from '../../redux/selectors'
import { Pocket, State } from '../../types'

import { useGrid } from './grid-context'
import PocketListItem from './pocket-list-item'

interface Props {
  pockets: Pocket[]
}

const mapStateToProps = (state: State) =>
  ({ pockets: getOrderedPockets(state) } as Props)

const PocketList = ({ pockets }: Props) => {
  const { setGrid } = useGrid()
  return (
    <div css={{ overflow: 'auto' }}>
      {/* XMasonry eats the bottom padding on its parent for some reason,
          so we need this wrapper if we want padding around our grid */}
      <div css={{ margin: 8 }}>
        <XMasonry
          ref={setGrid}
          smartUpdate={false}
          targetBlockWidth={400}
          maxColumns={4}
        >
          {pockets.map((pocket, i) => (
            <XBlock key={`${i}:${pocket.id}`}>
              <PocketListItem pocket={pocket} handleEdit={x => x} />
            </XBlock>
          ))}
        </XMasonry>
      </div>
    </div>
  )
}

export default connect(mapStateToProps)(PocketList)
