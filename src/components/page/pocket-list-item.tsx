/** @jsx jsx */
import { jsx } from '@emotion/core'
import Color from 'color'
import { Draggable } from 'react-beautiful-dnd'

import styled from '../../styled'
import { Pocket } from '../../types'
import { Emoji } from '../shared/emoji'
import Flex from '../shared/flex'
import PocketCount from '../shared/pocket-count'
import PocketIcon from '../shared/pocket-icon'
import { DragHandle, Truncated } from '../shared/utils'

import PocketDetails from './pocket-details'
import TabList from './tab-list'

interface Props {
  pocket: Pocket
  index: number
  handleEdit: (id: string) => void
}

const PocketListItem = styled.div<{ color: string }>(props => ({
  backgroundColor: Color(props.theme.colors.altBackground)
    .mix(Color(props.color), 0.3)
    .hex()
}))

const PocketListItemWrapper = ({ pocket, handleEdit, index }: Props) => {
  return (
    <Draggable draggableId={pocket.id} index={index}>
      {provided => (
        <div
          className="pocket-list-item-holder"
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div className="pocket-list-item-holder-scrollfix">
            <PocketListItem
              className="pocket-list-item"
              key={pocket.id}
              color={pocket.color}
            >
              <div className="pocket-info">
                <PocketDetails
                  className="details"
                  color={pocket.color}
                  alignItems="center"
                >
                  <Flex flex={0} {...provided.dragHandleProps}>
                    <DragHandle />
                  </Flex>
                  <Flex flex={0}>
                    <PocketIcon icon={pocket.icon} />
                  </Flex>
                  <Flex
                    css={{ minWidth: 0, textAlign: 'left' }}
                    className="pocket-name"
                    flex={1}
                  >
                    <Truncated>{pocket.name}</Truncated>
                  </Flex>
                  <PocketCount count={pocket.tabs.length} />
                </PocketDetails>
                <Flex
                  className="edit-pocket"
                  onClick={() => handleEdit(pocket.id)}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Emoji emoji="✏️" size={13} />
                </Flex>
              </div>
              <TabList pocketId={pocket.id} color={pocket.color} />
            </PocketListItem>
          </div>
        </div>
      )}
    </Draggable>
  )
}
export default PocketListItemWrapper
