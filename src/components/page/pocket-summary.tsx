/** @jsx jsx */
import { jsx } from '@emotion/core'
import { connect } from 'react-redux'

import { getOrderedPockets } from '../../redux/selectors'
import { Pocket, State } from '../../types'
import Flex from '../shared/flex'
import PocketCount from '../shared/pocket-count'
import PocketIcon from '../shared/pocket-icon'

interface Props {
  pockets: Pocket[]
}

const mapStateToProps = (state: State) =>
  ({
    pockets: getOrderedPockets(state)
  } as Props)

const PocketIcons = ({ pockets }: Props) => (
  <Flex className="pocket-summary" center gap={8}>
    {pockets.map(pocket => (
      <Flex
        center
        className="pocket-summary-item"
        gap={8}
        css={{
          backgroundColor: pocket.color,
          padding: '5px 7px',
          borderRadius: 4,
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)'
        }}
        key={pocket.id}
      >
        <PocketIcon icon={pocket.icon} />
        <PocketCount count={pocket.tabs.length} />
      </Flex>
    ))}
  </Flex>
)

export default connect(mapStateToProps)(PocketIcons)
