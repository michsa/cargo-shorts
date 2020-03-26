import React from 'react'

import styled from '../../styled'
import Flex from '../shared/flex'

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

export const DragHandle = () => (
  <Flex column center className="drag-handle">
    <Flex>::</Flex>
    <Flex>::</Flex>
  </Flex>
)
