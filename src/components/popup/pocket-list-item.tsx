import React from 'react'
import { Draggable } from 'react-beautiful-dnd'

import { Pocket } from '../../types'
import { Emoji } from '../shared/emoji'
import { FlexChild, FlexParent } from '../shared/flexbox'
import PocketCount from '../shared/pocket-count'
import PocketIcon from '../shared/pocket-icon'
import { DragHandle, Truncated } from '../shared/utils'

import PocketDetails from './pocket-details'

interface Props {
  pocket: Pocket,
  isActive: boolean,
  index: number,
  handleEdit: (id: string) => void,
  handleClick: (id: string) => void
}

const PocketListItem = ({ pocket, isActive, index, handleEdit, handleClick }: Props) => (
  <Draggable draggableId={pocket.id} index={index}>
    {(provided) => (
      <div
        className="pocket-list-item"
        ref={provided.innerRef}
        {...provided.draggableProps}
      >
        <PocketDetails
          pocket={pocket}
          isActive={isActive}
          onClick={() => handleClick(pocket.id)}
          className="details"
          flex={1}
          alignItems="center"
          color={pocket.color}
        >
          <FlexChild flex={0} {...provided.dragHandleProps}>
            <DragHandle />
          </FlexChild>
          <FlexChild flex={0}>
            <PocketIcon icon={pocket.icon} />
          </FlexChild>
          <FlexChild style={{ minWidth: 0, textAlign: 'left' }} className="pocket-name" flex={1}>
            <Truncated>{pocket.name}</Truncated>
          </FlexChild>
          <PocketCount count={pocket.tabs.length} />
        </PocketDetails>
        <FlexParent
          className="edit-pocket"
          onClick={() => handleEdit(pocket.id)}
          justifyContent="center"
          alignItems="center"
        >
          <Emoji emoji="✏️" size={13} />
        </FlexParent>
      </div>
    )}
  </Draggable>
)
export default PocketListItem
