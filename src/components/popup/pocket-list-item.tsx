/** @jsx jsx */
import { jsx } from '@emotion/core'
import Color from 'color'
import { Draggable } from 'react-beautiful-dnd'

import { Pocket } from '../../types'
import { Emoji } from '../shared/emoji'
import Flex from '../shared/flex'
import PocketCount from '../shared/pocket-count'
import PocketIcon from '../shared/pocket-icon'
import { DragHandle, Truncated } from '../shared/utils'

interface Props {
  pocket: Pocket
  isActive: boolean
  index: number
  handleEdit: (id: string) => void
  handleClick: (id: string) => void
}

const PocketListItem = ({
  pocket,
  isActive,
  index,
  handleEdit,
  handleClick
}: Props) => (
  <Draggable draggableId={pocket.id} index={index}>
    {provided => (
      <div
        className="pocket-list-item"
        css={{
          borderRadius: 2,
          overflow: 'hidden',
          cursor: 'pointer',
          position: 'relative',
          height: 32,
          boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.2)',
          ':hover > *:first-child': {
            marginRight: 32,
            transition: 'margin-right 0.3s ease 0.2s'
          }
        }}
        ref={provided.innerRef}
        {...provided.draggableProps}
      >
        <Flex
          css={theme => ({
            cursor: 'pointer',
            position: 'absolute',
            boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.2)',
            left: 0,
            right: 0,
            bottom: 0,
            top: 0,
            zIndex: 2,
            borderRadius: 2,
            marginRight: 0,
            paddingRight: 8,
            transition:
              'color 0.2s ease, background-color 0.2s ease, margin-right 0.3s ease 0s',
            backgroundColor: isActive
              ? pocket.color
              : Color(theme.colors.altBackground)
                  .mix(Color(pocket.color), 0)
                  .hex(),
            color:
              isActive && Color(pocket.color).isDark() !== theme.isDark
                ? theme.colors.altBackground
                : theme.colors.text,
            borderLeft: `8px solid ${pocket.color}`,
            ':hover': {
              backgroundColor: Color(theme.colors.altBackground)
                .mix(Color(pocket.color), isActive ? 0.8 : 0.15)
                .hex()
            }
          })}
          onClick={() => handleClick(pocket.id)}
          className="details"
          alignItems="center"
          flex={1}
          gap={8}
        >
          <DragHandle {...provided.dragHandleProps} />
          <PocketIcon icon={pocket.icon} />
          <div
            css={{ flex: 1, fontWeight: 600, minWidth: 0 }}
            className="pocket-name"
          >
            <Truncated>{pocket.name}</Truncated>
          </div>
          <PocketCount count={pocket.tabs.length} />
        </Flex>
        <Flex
          css={theme => ({
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            zIndex: 1,
            width: 32,
            cursor: 'pointer',
            backgroundColor: theme.colors.accent
          })}
          inline
          center
          onClick={() => handleEdit(pocket.id)}
        >
          <Emoji emoji="✏️" size={13} />
        </Flex>
      </div>
    )}
  </Draggable>
)
export default PocketListItem
