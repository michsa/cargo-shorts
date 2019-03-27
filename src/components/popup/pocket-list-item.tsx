import Color from 'color'
import { Emoji } from 'emoji-mart'
import React from 'react'

import styled from '../../styled-components'
import { Pocket } from '../../types'
import { FlexChild, FlexParent } from '../shared/flexbox'
import PocketIcon from '../shared/pocket-icon'
import { DragHandle } from '../shared/utils'

interface Props {
  pocket: Pocket,
  isActive: boolean,
  handleEdit: (id: string) => void,
  handleClick: (id: string) => void
}

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

/*
const transitionStyles = {
  entering: {
    backgroundPosition: 'right bottom'
  },
  entered: {
    backgroundPosition: 'left bottom'
  },
}
*/

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

// 

const PopupPocketListItem = ({ pocket, isActive, handleEdit, handleClick }: Props) => {
  const doClick = () => handleClick(pocket.id)

  // const [inProp, setInProp] = useState(false)

  return (
    <li className="pocket-list-item">
      <PocketDetails
        className="details"
        flex={1}
        alignItems="center"
        color={pocket.color}
        isActive={isActive}
        onClick={doClick}
      >
        <FlexChild flex={0}>
          <DragHandle />
        </FlexChild>
        <FlexChild flex={0}>
          <PocketIcon icon={pocket.icon} />
        </FlexChild>
        <FlexChild className="pocket-name" flex={1}>
          {pocket.name}
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
        <Emoji emoji=":pencil2:" native={true} size={13} />
      </FlexParent>
    </li>
  )
}

export default PopupPocketListItem
