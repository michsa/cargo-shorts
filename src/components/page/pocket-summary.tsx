import * as React from 'react'
import { connect } from 'react-redux'

import { getOrderedPockets } from '../../redux/selectors'
import styled from '../../styled-components'
import { Pocket, State } from '../../types'
import { FlexCenter } from '../shared/flexbox'
import PocketCount from '../shared/pocket-count'
import PocketIcon from '../shared/pocket-icon'

interface Props {
  pockets: Pocket[]
}

const mapStateToProps = (state: State) => ({
  pockets: getOrderedPockets(state)
} as Props)

const IconHolder = styled(FlexCenter) <{ color: string }>`
  background-color: ${props => props.color};
`

const PocketIcons = ({ pockets }: Props) => (
  <FlexCenter className="pocket-summary">
    {pockets.map(pocket =>
      <IconHolder
        color={pocket.color}
        key={pocket.id}
        className="pocket-summary-item"
      >
        <PocketIcon icon={pocket.icon} />
        <PocketCount count={pocket.tabs.length} margin={0} />
      </IconHolder>
    )}
  </FlexCenter>
)

export default connect(mapStateToProps)(PocketIcons)
