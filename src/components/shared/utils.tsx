import React from 'react'

import styled from '../../styled'
import Flex from '../shared/flex'

export const List = styled.ul({
  listStyleType: 'none',
  margin: 0,
  padding: 0
})

export const Truncated = styled.div({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
})

export const DragHandle = () => (
  <Flex column center className="drag-handle">
    <div>::</div>
    <div>::</div>
  </Flex>
)
