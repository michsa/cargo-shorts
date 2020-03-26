import * as React from 'react'
import { connect } from 'react-redux'
import { Flex } from 'reflexbox'

import { getOrderedPockets } from '../../redux/selectors'
import styled from "../../styled"
import { Pocket, State } from '../../types'
import PocketCount from '../shared/pocket-count'
import PocketIcon from '../shared/pocket-icon'

interface Props {
  pockets: Pocket[]
}

const mapStateToProps = (state: State) =>
  ({
    pockets: getOrderedPockets(state)
  } as Props)

const IconHolder = styled(Flex)<{ color: string }>`
  background-color: ${props => props.color};
`

const PocketIcons = ({ pockets }: Props) => (
  <Flex className="pocket-summary" justifyContent="center" alignItems="center">
    {pockets.map(pocket => (
      <IconHolder
        color={pocket.color}
        key={pocket.id}
        className="pocket-summary-item"
      >
        <PocketIcon icon={pocket.icon} />
        <PocketCount count={pocket.tabs.length} margin={0} />
      </IconHolder>
    ))}
  </Flex>
)

export default connect(mapStateToProps)(PocketIcons)
