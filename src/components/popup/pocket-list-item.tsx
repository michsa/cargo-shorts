import Color from 'color'
import React from 'react'

import styled from '../../styled-components'
import { Pocket } from '../../types'
import { Emoji } from '../shared/emoji'
import { FlexChild, FlexParent } from '../shared/flexbox'
import PocketIcon from '../shared/pocket-icon'
import { DragHandle, Truncated } from '../shared/utils'

interface Props {
  pocket: Pocket,
  isActive: boolean,
  handleEdit: (id: string) => void,
  handleClick: (id: string) => void
}

const PocketDetails = styled(FlexParent) <{ isActive: boolean, color: string }>`
  background-color: ${props =>
    props.isActive
      ? props.color
      : props.theme.altBackgroundColor
  };
  color: ${props =>
    props.isActive && Color(props.color).isDark() !== props.theme.isDark
      ? props.theme.altBackgroundColor
      : props.theme.textColor
  };
  border-left: 8px solid ${props => props.color};
  :hover {
    background-color: ${props =>
    Color(props.theme.altBackgroundColor).mix(
      Color(props.color), props.isActive ? 0.8 : 0.1
    ).hex()
  };
  }
  .pocket-count {
    background-color: ${props =>
    Color(props.theme.altBackgroundColor).alpha(0.65).string()
  };
    box-shadow: 0 0 0 1px ${props =>
    Color(props.theme.altBackgroundColor).alpha(0.15).string()
  }, 0 0 3px ${props => Color(props.theme.altBackgroundColor).alpha(0.65).string()};
    color: ${props => props.theme.textColor}
  }
`

const PopupPocketListItem = ({ pocket, isActive, handleEdit, handleClick }: Props) => (
  <React.Fragment>
    <PocketDetails
      className="details"
      flex={1}
      alignItems="center"
      color={pocket.color}
      isActive={isActive}
      onClick={() => handleClick(pocket.id)}
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
    </PocketDetails>
    <FlexParent
      className="edit-pocket"
      onClick={() => handleEdit(pocket.id)}
      justifyContent="center"
      alignItems="center"
    >
      <Emoji emoji=":pencil2:" size={13} />
    </FlexParent>
  </React.Fragment>
)

export default PopupPocketListItem
