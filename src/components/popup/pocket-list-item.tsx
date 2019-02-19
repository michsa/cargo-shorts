import React from 'react'
import styled from 'styled-components'

import { Pocket } from '../../types'
import PocketIcon from '../shared/pocket-icon'

interface Props {
  pocket: Pocket,
  isActive: boolean,
  handleEdit: (id: string) => void,
  handleClick: (id: string) => void
}

const PocketDetails = styled('div') <{ isActive: boolean, color: string }>`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background-color: ${props => props.isActive ? props.color : '#fafafa'};
  box-shadow: 0px 1px 3px rgba(0,0,0,0.3);
  flex: 1;
  padding: 0 0.5em;
  display: flex;
  align-items: center;
  z-index: 2;
`

const PopupPocketListItem = ({ pocket, isActive, handleEdit, handleClick }: Props) => {
  const doClick = () => handleClick(pocket.id)
  return (
    <li className="pocket-list-item" key={pocket.id}>
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
    </li>
  )
}

export default PopupPocketListItem
