import React from 'react'
import { Flex } from 'reflexbox'

import styled from "../../styled"

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
  <Flex
    flexDirection="column"
    className="drag-handle"
    justifyContent="center"
    alignItems="center"
  >
    <Flex>::</Flex>
    <Flex>::</Flex>
  </Flex>
)
