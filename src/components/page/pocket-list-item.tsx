/** @jsx jsx */
import { jsx } from '@emotion/core'
import Color from 'color'

import { Pocket } from '../../types'
import { Emoji } from '../shared/emoji'
import Flex from '../shared/flex'
import PocketCount from '../shared/pocket-count'
import { Truncated } from '../shared/utils'

import TabList from './tab-list'

interface Props {
  pocket: Pocket
  index: number
  handleEdit: (id: string) => void
}

const PocketListItem = ({ pocket, handleEdit }: Props) => (
  <div
    className="pocket-list-item"
    key={pocket.id}
    color={pocket.color}
    css={theme => ({
      backgroundColor: Color(theme.colors.altBackground)
        .mix(Color(pocket.color), 0.3)
        .hex(),
      borderRadius: 4,
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
      height: 'auto',
      overflow: 'hidden',
      /* for Firefox */
      minHeight: 0
    })}
  >
    <div
      className="pocket-info"
      css={{
        position: 'relative',
        height: 36,
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
        ':hover .details': {
          marginRight: 36,
          transition: 'margin-right 0.3s ease 0.3s'
        }
      }}
    >
      <Flex
        className="details"
        alignItems="center"
        gap={8}
        css={theme => ({
          backgroundColor: pocket.color,
          color:
            Color(pocket.color).isDark() !== theme.isDark
              ? theme.colors.altBackground
              : theme.colors.text,
          position: 'absolute',
          boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.15)',
          left: 0,
          right: 0,
          bottom: 0,
          top: 0,
          zIndex: 2,
          marginRight: 0,
          padding: '0 12px',
          transition:
            'color 0.2s ease, background-color 0.2s ease, margin-right 0.3s ease 0s'
        })}
      >
        <Emoji emoji={pocket.icon} size={18} />
        <Flex
          css={{
            minWidth: 0,
            textAlign: 'left',
            fontSize: '1.2em',
            fontWeight: 600
          }}
          className="pocket-name"
          flex={1}
        >
          <Truncated>{pocket.name}</Truncated>
        </Flex>
        <PocketCount count={pocket.tabs.length} />
      </Flex>
      <Flex
        className="edit-pocket"
        onClick={() => handleEdit(pocket.id)}
        center
        css={theme => ({
          width: 36,
          height: 36,
          backgroundColor: theme.colors.accent,
          float: 'right',
        })}
      >
        <Emoji emoji="✏️" size={13} />
      </Flex>
    </div>
    <TabList pocketId={pocket.id} color={pocket.color} />
  </div>
)
export default PocketListItem
