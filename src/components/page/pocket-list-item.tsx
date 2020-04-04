/** @jsx jsx */
import { jsx } from '@emotion/core'
import Color from 'color'

import { Pocket } from '../../types'
import { Emoji } from '../shared/emoji'
import Flex from '../shared/flex'
import PocketCount from '../shared/pocket-count'
import PocketIcon from '../shared/pocket-icon'
import { Truncated } from '../shared/utils'

import PocketDetails from './pocket-details'
import TabList from './tab-list'

interface Props {
  pocket: Pocket
  index: number
  handleEdit: (id: string) => void
}

const PocketListItem = ({ pocket, handleEdit }: Props) => (
  <div
    className="pocket-list-item-holder"
    css={{
      position: 'relative',
      flex: '0 0 304px'
    }}
  >
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
        flexGrow: 0,
        display: 'flex',
        flexDirection: 'column',
        /* for Firefox */
        minHeight: 0
      })}
    >
      <div
        className="pocket-info"
        css={{
          position: 'relative',
          height: 32,
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
          ':hover .details': {
            marginRight: 32,
            transition: 'margin-right 0.3s ease 0.3s'
          }
        }}
      >
        <PocketDetails
          className="details"
          color={pocket.color}
          alignItems="center"
          css={{
            position: 'absolute',
            boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.15)',
            left: 0,
            right: 0,
            bottom: 0,
            top: 0,
            zIndex: 2,
            marginRight: 0,
            transition:
              'color 0.2s ease, background-color 0.2s ease, margin-right 0.3s ease 0s'
          }}
        >
          <PocketIcon icon={pocket.icon} />
          <Flex
            css={{ minWidth: 0, textAlign: 'left', fontSize: '1.2em' }}
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
          center
          css={{
            width: 32,
            height: 32,
            backgroundColor: '#FEDB41',
            float: 'right'
          }}
        >
          <Emoji emoji="✏️" size={13} />
        </Flex>
      </div>
      <TabList pocketId={pocket.id} color={pocket.color} />
    </div>
  </div>
)
export default PocketListItem
