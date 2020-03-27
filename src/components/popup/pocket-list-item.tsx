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
        ref={provided.innerRef}
        {...provided.draggableProps}
      >
        <Flex
          css={theme => ({
            backgroundColor: isActive
              ? pocket.color
              : theme.colors.altBackground,
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
          <PocketCount
            css={theme => ({
              backgroundColor: Color(theme.colors.altBackground)
                .alpha(0.65)
                .string(),
              boxShadow: `0 0 0 1px ${Color(theme.colors.altBackground)
                .alpha(0.15)
                .string()}, 0 0 3px ${Color(theme.colors.altBackground)
                .alpha(0.65)
                .string()}`,
              color: theme.colors.text
            })}
            count={pocket.tabs.length}
          />
        </Flex>
        <Flex
          className="edit-pocket"
          onClick={() => handleEdit(pocket.id)}
          justifyContent="center"
          alignItems="center"
        >
          <Emoji emoji="✏️" size={13} />
        </Flex>
      </div>
    )}
  </Draggable>
)
export default PocketListItem
