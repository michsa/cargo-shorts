import React, { FunctionComponent } from 'react'
import { Emoji } from 'emoji-mart'

import styled from '../../styled-components'

import { FlexCenter, FlexChild, flexifyCentered } from './flexbox'

export const List = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`

export const Truncated = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const DragHandleComponent = () => (
  <FlexCenter
    flexDirection="column"
    className="drag-handle"
  >
    <FlexChild>::</FlexChild>
    <FlexChild>::</FlexChild>
  </FlexCenter>
)

export const DragHandle = DragHandleComponent

export const StyledButton = styled('button')`
  border-color: ${props => props.theme.primaryColor};
  color: ${props => props.theme.primaryColor};
  background-color: ${props => props.theme.altBackgroundColor};
  :hover {
    background-color: ${props => props.theme.accentColor};
  }
  :active {
    background-color: ${props => props.theme.secondaryColor};
  }
  border-width: 2px;
  border-style: dashed;
  font-weight: bold;
  font-size: 1.1em;
  letter-spacing: 0.1em;
  padding: 4px 16px;
  text-align: center;
  border-radius: 4px;
  cursor: pointer;
  height: 32px;
  transition: 0.1s;
  :hover {
    border-style: solid;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3);
  }
  :active {
    box-shadow: none;
  }
`


const StyledButton2 = styled('button')`
  border-color: ${props => props.theme.primaryColor};
  color: ${props => props.theme.primaryColor};
  background-color: ${props => props.theme.altBackgroundColor};
  :hover {
    background-color: ${props => props.theme.accentColor};
  }
  :active {
    background-color: ${props => props.theme.secondaryColor};
  }
`

const FlexButton = flexifyCentered(StyledButton2)

const IconButton: FunctionComponent<{ icon?: string, onClick: () => void }> = (props) => (
  <FlexButton as="button" className="button" onClick={props.onClick}>
    {props.icon && <Emoji emoji={props.icon} native={true} size={14} />}
    {props.icon && props.children && <div style={{ width: "4px" }} />}
    {props.children}
  </FlexButton>
)


export const Button = IconButton



/*
export const DragHandle = styled(DragHandleComponent)`
  font-size: 11px;
  line-height: 8px;
  letter-spacing: -1px;
  width: 10px;
  text-align: center;
`
*/
