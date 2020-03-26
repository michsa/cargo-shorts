import * as React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { Flex } from 'reflexbox'

import { SavedTab } from '../../types'
import TabInfo from '../shared/tab-info'
import { DragHandle } from '../shared/utils'

interface Props {
  tab: SavedTab
  index: number
}

const TabListItem = ({ tab, index }: Props) => (
  <Draggable draggableId={tab.id} index={index}>
    {provided => (
      <li
        className="tab-list-item"
        ref={provided.innerRef}
        {...provided.draggableProps}
      >
        <Flex justifyContent="center" alignItems="center">
          <Flex {...provided.dragHandleProps} flex={0}>
            <DragHandle />
          </Flex>
          <Flex flex={1} style={{ minWidth: 0, textAlign: 'left' }}>
            <a href={tab.url}>
              <TabInfo tab={tab} iconSize={24} />
            </a>
          </Flex>
        </Flex>
      </li>
    )}
  </Draggable>
)
export default TabListItem
