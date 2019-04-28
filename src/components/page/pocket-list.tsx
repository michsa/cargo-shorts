import { move } from 'ramda'
import * as React from 'react'
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'
import { connect } from 'react-redux'

import { movePocket } from '../../redux/actions/ui'
import { getOrderedPockets } from '../../redux/selectors'
import { Pocket, State } from '../../types'
import { FlexChild, FlexParent } from '../shared/flexbox'

import PocketListItem from './pocket-list-item'

interface Props {
  pockets: Pocket[]
}

interface Handlers {
  onDragEnd: (result: DropResult) => void
}

const mapStateToProps = (state: State) => ({
  pockets: getOrderedPockets(state)
} as Props)

const mapDispatchToProps = {
  onDragEnd: (result: DropResult) => (
    result.destination && movePocket({
      start: result.source.index,
      end: result.destination.index
    })
  )
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
      <Droppable
        droppableId="pagePocketList"
        direction="horizontal"
        type="COLUMN"
      >
        {(provided) => (
          <FlexParent
            flex={1}
            flexWrap="none"
            flexDirection="row"
            className="pocket-list"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <FlexChild flex="1 1" />
            {pockets.map((pocket, index) =>
              <PocketListItem
                index={index}
                pocket={pocket}
                key={pocket.id}
                handleEdit={(x) => x}
              />
            )}
            {provided.placeholder}
            <FlexChild flex="1 1" />
          </FlexParent>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(PocketList)
