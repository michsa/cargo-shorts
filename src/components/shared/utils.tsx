import React from 'react'

import styled from '../../styled-components'

import { FlexChild, flexifyCentered, FlexParent } from './flexbox'

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
  <FlexParent
    flexDirection="column"
    className="drag-handle"
    justifyContent="center"
    alignItems="center"
  >
    <FlexChild>::</FlexChild>
    <FlexChild>::</FlexChild>
  </FlexParent>
)

export const DragHandle = DragHandleComponent

const StyledButton = styled('button')`
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
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
  }
  :active {
    box-shadow: none;
  }
`

export const Button = flexifyCentered(StyledButton)


/*
export const DragHandle = styled(DragHandleComponent)`
  font-size: 11px;
  line-height: 8px;
  letter-spacing: -1px;
  width: 10px;
  text-align: center;
`
*/
