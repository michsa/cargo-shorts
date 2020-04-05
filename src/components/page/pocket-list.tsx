/** @jsx jsx */
import { jsx } from '@emotion/core'
import { createContext, useState } from 'react'
import { connect } from 'react-redux'
import { XMasonry, XBlock } from 'react-xmasonry'

import { getOrderedPockets } from '../../redux/selectors'
import { Pocket, State } from '../../types'

import PocketListItem from './pocket-list-item'

type Grid = { update: () => void } | undefined

export const GridContext = createContext<Grid>(undefined)

interface Props {
  pockets: Pocket[]
}

const mapStateToProps = (state: State) =>
  ({ pockets: getOrderedPockets(state) } as Props)

const PocketList = ({ pockets }: Props) => {
  const [grid, setGrid] = useState<Grid>()
  grid && grid.update()
  return (
    <GridContext.Provider value={grid}>
      <XMasonry
        ref={setGrid}
        smartUpdate={true}
        targetBlockWidth={400}
        maxColumns={4}
      >
        {pockets.map(pocket => (
          <XBlock key={pocket.id}>
            <PocketListItem pocket={pocket} handleEdit={x => x} />
          </XBlock>
        ))}
      </XMasonry>
    </GridContext.Provider>
  )
}

export default connect(mapStateToProps)(PocketList)
