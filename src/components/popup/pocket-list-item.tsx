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

/*
  background: linear-gradient(to right, ${props =>
    props.isActive
    ? `${props.color} 100%, ${props.theme.altBackgroundColor} 1%`
    : `${props.color} 1%, ${props.theme.altBackgroundColor} 1%`
  });
  background: linear-gradient(to right, ${props =>
    `${props.color} ${props.isActive ? '100%' : '100%'}, ${props.theme.altBackgroundColor} 1%`
  });
*/

const PocketDetails = styled('div') <{ isActive: boolean, color: string }>`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background-color: ${props =>
    props.isActive
      ? props.color
      : props.theme.altBackgroundColor
  };
  background-image: linear-gradient(to right, ${props => props.color}bb 50.7%, transparent 0%);
  background-size: 200% 100%;
  background-position: ${props => props.isActive ? 'left' : 'right'} bottom;
  transition: background-color 0.1s, background-position 0.6s;
  box-shadow: 0px 1px 3px rgba(0,0,0,0.3);
  flex: 1;
  padding: 0 0.5em;
  display: flex;
  align-items: center;
  z-index: 2;

  :hover {
    background-color: ${props =>
      props.isActive
        ? props.theme.altBackgroundColor
        : Color(props.theme.altBackgroundColor).mix(Color(props.color), 0.1).hex()
    }
  }

  .pocket-name {
    font-size: 1.1em;
    color: ${props =>
      props.isActive && Color(props.color).isDark() !== props.theme.isDark
        ? props.theme.altBackgroundColor
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
        <div className="pocket-name">{pocket.name}</div>
        <div className="pocket-count">{pocket.tabs.length}</div>
      </PocketDetails>
      <div className="edit-pocket" onClick={() => handleEdit(pocket.id)}>edit</div>
    </PocketListItem>
  )
}

export default PopupPocketListItem
