import React from 'react'
import { Flex } from 'reflexbox'

import styled from '../../styled-components'

import { Emoji } from './emoji'

export const Button = styled('button')`
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

interface Props {
  icon?: string
  children?: React.ReactChild
  onClick: () => void
}

export const IconButton = ({ icon, children, onClick }: Props) => (
  <Button as="button" className="button" onClick={onClick}>
    {icon && <Emoji emoji={icon} size={14} />}
    {icon && children && <Flex flex="0 0 0.4em" />}
    {children}
  </Button>
)
