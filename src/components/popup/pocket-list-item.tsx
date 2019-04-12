import React from 'react'

import { Pocket } from '../../types'
import { Emoji } from '../shared/emoji'
import { FlexParent } from '../shared/flexbox'
import PocketDetails from '../shared/pocket-details'

interface Props {
  pocket: Pocket,
  isActive: boolean,
  handleEdit: (id: string) => void,
  handleClick: (id: string) => void
}

export default ({ pocket, isActive, handleEdit, handleClick }: Props) => (
  <React.Fragment>
    <PocketDetails
      pocket={pocket}
      isActive={isActive}
      onClick={() => handleClick(pocket.id)}
    />
    <FlexParent
      className="edit-pocket"
      onClick={() => handleEdit(pocket.id)}
      justifyContent="center"
      alignItems="center"
    >
      <Emoji emoji="✏️" size={13} />
    </FlexParent>
  </React.Fragment>
)
