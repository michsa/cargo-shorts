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
  <Flex className="pocket-summary" center>
    {pockets.map(pocket => (
      <Flex
        center
        css={{ backgroundColor: pocket.color }}
        key={pocket.id}
        className="pocket-summary-item"
      >
        <PocketIcon icon={pocket.icon} />
        <PocketCount count={pocket.tabs.length} css={{ margin: 0 }} />
      </Flex>
    ))}
  </Flex>
)

export default connect(mapStateToProps)(PocketIcons)
