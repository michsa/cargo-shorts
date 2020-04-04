/** @jsx jsx */
import { jsx } from '@emotion/core'
import { move } from 'ramda'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { connect } from 'react-redux'

import { movePocket, moveTab } from '../../redux/actions/ui'
import { getOrderedPockets } from '../../redux/selectors'
import Grid from '../shared/grid'
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
  const handleDragEnd = (result: DropResult) => {
    if (result.destination) {
      pockets = move(result.source.index, result.destination.index, pockets)
      onDragEnd(result)
    }
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Grid
        autoRows="minmax(42px, auto)"
        gap={8}
        columns="repeat(auto-fit, minmax(300px, 400px))"
        className="pocket-list"
        placeContent="center"
        css={{
          padding: '8px 8px 0',
          // overflowX: 'auto',
          // '> *': { maxWidth: 512, minWidth: 320, margin: 8 }
        }}
      >
        {pockets.map((pocket, index) => (
          <PocketListItem
            index={index}
            pocket={pocket}
            key={pocket.id}
            handleEdit={x => x}
          />
        ))}
      </Grid>
    </DragDropContext>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(PocketList)
