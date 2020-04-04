import { move } from 'ramda'
import * as React from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { connect } from 'react-redux'
import Snuggle from 'react-snuggle'

import { movePocket, moveTab } from '../../redux/actions/ui'
import { getOrderedPockets } from '../../redux/selectors'
import { Pocket, State } from '../../types'
import Flex from '../shared/flex'

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
      <Flex flex={1} className="pocket-list">
        <Flex flex="1 1" />
        <Snuggle style={{ width: '800px' }}>
          {pockets.map((pocket, index) => (
            <PocketListItem
              index={index}
              pocket={pocket}
              key={pocket.id}
              handleEdit={x => x}
            />
          ))}
        </Snuggle>
        <Flex flex="1 1" />
      </Flex>
    </DragDropContext>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(PocketList)
