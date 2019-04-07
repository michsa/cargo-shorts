import React from 'react'

import styled from '../../styled-components'

import { FlexCenter, FlexChild } from './flexbox'

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
  <FlexCenter
    flexDirection="column"
    className="drag-handle"
  >
    <FlexChild>::</FlexChild>
    <FlexChild>::</FlexChild>
  </FlexCenter>
)

