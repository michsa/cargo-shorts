/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useState } from 'react'
import { DropResult } from 'react-beautiful-dnd'
import { connect } from 'react-redux'
import { XMasonry, XBlock } from 'react-xmasonry'

import { movePocket, moveTab } from '../../redux/actions/ui'
import { getOrderedPockets } from '../../redux/selectors'
import { Pocket, State } from '../../types'

import PocketListItem from './pocket-list-item'

interface Props {
  pockets: Pocket[]
}

interface Handlers {
  onDragEnd: (result: DropResult) => void
}

const mapStateToProps = (state: State) =>
  ({
    pockets: getOrderedPockets(state)
  } as Props)

const mapDispatchToProps = {
  onDragEnd: (result: DropResult) =>
    result.destination &&
    (result.type === 'COLUMN'
      ? movePocket({
          start: result.source.index,
          end: result.destination.index
        })
      : moveTab({
          tabId: result.draggableId,
          pocketId: result.destination.droppableId,
          position: result.destination.index
        }))
} as Handlers

const PocketList = ({ pockets, onDragEnd }: Props & Handlers) => {
  const [grid, setGrid] = useState()
  return (
      <XMasonry ref={setGrid} smartUpdate={false} targetBlockWidth={400} maxColumns={4}>
        {pockets.map((pocket) => (
          <XBlock key={pocket.id}>
          <PocketListItem
            pocket={pocket}
            grid={grid}
            handleEdit={x => x}
          />
          </XBlock>
        ))}
      </XMasonry>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(PocketList)
