import React from 'react'

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

interface Props {
  icon?: string, 
  children: React.ReactChild, 
  onClick: () => void
}

export const IconButton = ({ icon, children, onClick }: Props) => (
  <Button as="button" className="button" onClick={onClick}>
    {icon && <Emoji emoji={icon} size={14} />}
    {icon && children && <FlexChild flex="0 0 0.4em" />}
    {children}
  </Button>
)
