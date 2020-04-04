/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Draggable } from 'react-beautiful-dnd'

import { SavedTab } from '../../types'
import Flex from '../shared/flex'
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
        css={theme => ({
          backgroundColor: theme.colors.background,
          margin: '4px 4px 0',
          padding: '4px 0',
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.15)'
        })}
        {...provided.draggableProps}
      >
        <Flex justifyContent="center" alignItems="center">
          <DragHandle {...provided.dragHandleProps} />
          <Flex flex={1} css={{ minWidth: 0, textAlign: 'left' }}>
            <a
              href={tab.url}
              css={{
                textDecoration: 'none',
                color: 'inherit',
                overflow: 'hidden'
              }}
            >
              <TabInfo
                tab={tab}
                iconSize={24}
                css={{
                  fontSize: '0.9em',
                  marginLeft: 0,
                  marginRight: 4
                }}
              />
            </a>
          </Flex>
        </Flex>
      </li>
    )}
  </Draggable>
)
export default TabListItem
