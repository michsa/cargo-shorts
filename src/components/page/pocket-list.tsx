import * as React from 'react'
import { connect } from 'react-redux'

import { getOrderedPockets } from '../../redux/selectors'
import styled from '../../styled-components'
import { Pocket, State } from '../../types'
import NewPocketButton from '../shared/new-pocket-button'
import { List } from '../shared/utils'

import PocketListItem from './pocket-list-item'

interface Props {
  pockets: Pocket[]
}

const mapStateToProps = (state: State) => ({
  pockets: getOrderedPockets(state)
} as Props)

const PocketListEl = styled(List)`
  width: 300px;
`

const PocketList = ({ pockets }: Props) => (
  <PocketListEl>
    {pockets.map((pocket) =>
      <PocketListItem
        pocket={pocket}
        key={pocket.id}
        handleEdit={(x) => x}
      />
    )}
    <li onClick={(x) => x}>
      <NewPocketButton />
    </li>
  </PocketListEl>
)

export default connect(mapStateToProps)(PocketList)
