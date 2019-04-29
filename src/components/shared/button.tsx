import React, { FunctionComponent } from 'react'

import styled from '../../styled-components'

import { Emoji } from './emoji'
import { FlexChild, flexifyCentered } from './flexbox'

export const Button = flexifyCentered(styled('button')`
  border-color: ${props => props.theme.primaryColor};
  color: ${props => props.theme.primaryColor};
  background-color: ${props => props.theme.altBackgroundColor};
  :hover {
    background-color: ${props => props.theme.accentColor};
  }
  :active {
    background-color: ${props => props.theme.secondaryColor};
  }
`)

export const IconButton: FunctionComponent<{ icon?: string, onClick: () => void }> = (props) => (
  <Button as="button" onClick={props.onClick}>
    {props.icon && <Emoji emoji={props.icon} size={14} />}
    {props.icon && props.children && <FlexChild flex="0 0 0.4em" />}
    {props.children}
  </Button>
)