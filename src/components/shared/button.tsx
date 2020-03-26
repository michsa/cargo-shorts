import React from 'react'
import { Flex } from 'reflexbox'

import styled from "../../styled"

import { Emoji } from './emoji'

export const Button = styled('button')`
  border-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.primary};
  background-color: ${props => props.theme.colors.altBackground};
  :hover {
    background-color: ${props => props.theme.colors.accent};
  }
  :active {
    background-color: ${props => props.theme.colors.secondary};
  }
`

interface Props {
  icon?: string
  children?: React.ReactChild
  onClick: () => void
}

export const IconButton = ({ icon, children, onClick }: Props) => (
  <Button className="button" onClick={onClick}>
    {icon && <Emoji emoji={icon} size={14} />}
    {icon && children && <Flex flex="0 0 0.4em" />}
    {children}
  </Button>
)
