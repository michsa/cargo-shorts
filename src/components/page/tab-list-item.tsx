import * as React from 'react'
import { Draggable } from 'react-beautiful-dnd'

import { SavedTab } from '../../types'
import { FlexCenter, FlexChild } from '../shared/flexbox'
import TabInfo from '../shared/tab-info'
import { DragHandle } from '../shared/utils'

interface Props {
  tab: SavedTab,
  index: number
}

export default ({ tab, index }: Props) => (
  <Draggable draggableId={tab.id} index={index}>
    {(provided) => (
      <li
        className="tab-list-item"
        ref={provided.innerRef}
        {...provided.draggableProps}
      >
        <FlexCenter>
          <FlexChild
            {...provided.dragHandleProps}
            flex={0}
          >
            <DragHandle />
          </FlexChild>
          <FlexChild flex={1} style={{ minWidth: 0, textAlign: 'left' }}>
            <a href={tab.url} >
              <TabInfo tab={tab} iconSize={24} />
            </a>
          </FlexChild>
        </FlexCenter>
      </li>
    )}
  </Draggable>
)
