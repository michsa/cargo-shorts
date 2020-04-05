/** @jsx jsx */
import { jsx } from '@emotion/core'
import { connect } from 'react-redux'
import { ReactSortable } from 'react-sortablejs'

import { reorderPockets } from '../../redux/actions/ui'
import { getOrderedPockets } from '../../redux/selectors'
import { Pocket, State } from '../../types'
import Flex from '../shared/flex'
import PocketCount from '../shared/pocket-count'
import PocketIcon from '../shared/pocket-icon'

type Props = { pockets: Pocket[] }
type Handlers = { reorderPockets: typeof reorderPockets }

const mapStateToProps = (state: State) =>
  ({
    pockets: getOrderedPockets(state)
  } as Props)

const mapDispatchToProps = { reorderPockets } as Handlers

const PocketIcons = ({ pockets, reorderPockets }: Props & Handlers) => (
  <Flex className="pocket-summary" center>
    <ReactSortable
      group="tabs"
      list={pockets}
      animation={200}
      setList={(x: Pocket[] | { payload: Pocket[] }) => {
        if ('payload' in x) x = x.payload
        console.log(x.map(p => p.id))
        reorderPockets(x.map(p => p.id))
      }}
      // onChange={() => grid && grid.update()}
      css={{ display: 'flex' }}
    >
      {pockets.map(pocket => (
        <Flex
          center
          className="pocket-summary-item"
          gap={8}
          css={{
            backgroundColor: pocket.color,
            padding: '5px 7px',
            borderRadius: 4,
            margin: 4,
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)'
          }}
          key={pocket.id}
        >
          <PocketIcon icon={pocket.icon} />
          <PocketCount count={pocket.tabs.length} />
        </Flex>
      ))}
    </ReactSortable>
  </Flex>
)

export default connect(mapStateToProps, mapDispatchToProps)(PocketIcons)
