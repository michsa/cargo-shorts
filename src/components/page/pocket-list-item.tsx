import Color from 'color'
import * as React from 'react'

import styled from '../../styled-components'
import { Pocket } from '../../types'
import { Emoji } from '../shared/emoji'
import { FlexChild, FlexParent } from '../shared/flexbox'
import PocketIcon from '../shared/pocket-icon'
import { DragHandle, Truncated } from '../shared/utils'

import PocketDetails from './pocket-details'
import TabList from './tab-list'

interface Props {
  pocket: Pocket
  handleEdit: (id: string) => void
}

const PocketListItem = styled.div<{color: string}>`
border: 2px solid ${props => props.color};
background-color: ${props => Color(props.color).alpha(0.1).string()}
`

export default ({ pocket, handleEdit }: Props) => {
  return (
    <PocketListItem className="pocket-list-item" key={pocket.id} color={pocket.color}>
      <PocketDetails
        className="details"
        color={pocket.color}
        alignItems="center"
      >
        <FlexChild flex={0}>
          <DragHandle />
        </FlexChild>
        <FlexChild flex={0}>
          <PocketIcon icon={pocket.icon} />
        </FlexChild>
        <FlexChild style={{ minWidth: 0, textAlign: 'left' }} className="pocket-name" flex={1}>
          <Truncated>{pocket.name}</Truncated>
        </FlexChild>
        <FlexChild className="pocket-count" flex={0}>
          {pocket.tabs.length}
        </FlexChild>
        <FlexParent
          className="edit-pocket"
          onClick={() => handleEdit(pocket.id)}
          justifyContent="center"
          alignItems="center"
        >
          <Emoji emoji="✏️" size={13} />
        </FlexParent>
      </PocketDetails>

      <TabList pocketId={pocket.id} />
    </PocketListItem>
  )
}
