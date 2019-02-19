import Color from 'color'
import React from 'react'

import styled from '../../styled-components'
import { Pocket } from '../../types'
import PocketIcon from '../shared/pocket-icon'

interface Props {
  pocket: Pocket,
  isActive: boolean,
  handleEdit: (id: string) => void,
  handleClick: (id: string) => void
}

const PocketListItem = styled('li')`
  position: relative;
  height: 2.5em;
  line-height: 2.5em;
  margin: 6px;
`

const PocketDetails = styled('div') <{ isActive: boolean, color: string }>`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background-color: ${props => props.isActive ? props.color : Color(props.color).whiten(0.5).hex()};
  box-shadow: 0px 1px 3px rgba(0,0,0,0.3);
  flex: 1;
  padding: 0 0.5em;
  display: flex;
  align-items: center;
  z-index: 2;

  .pocket-name {
    color: ${props => 
      props.isActive && Color(props.color).isDark() !== props.theme.isDark
        ? Color(props.theme.textColor).negate().hex()
        : props.theme.textColor
    };
  }
`

// 

const PopupPocketListItem = ({ pocket, isActive, handleEdit, handleClick }: Props) => {
  const doClick = () => handleClick(pocket.id)
  return (
    <PocketListItem>
      <PocketDetails
        color={pocket.color}
        isActive={isActive}
        onClick={doClick}
      >
        <PocketIcon icon={pocket.icon} />
        <div className="pocket-name">{pocket.name} </div>
        <div className="pocket-count"> {pocket.tabs.length} </div>
      </PocketDetails>
      <div className="edit-pocket" onClick={() => handleEdit(pocket.id)}> edit </div>
    </PocketListItem>
  )
}

export default PopupPocketListItem
