/** @jsx jsx */
import { jsx } from '@emotion/core'
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd'

import styled from '../../styled'
import Flex, { FlexProps } from '../shared/flex'

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

export const DragHandle = (
  props: FlexProps & Partial<DraggableProvidedDragHandleProps>
) => (
  <Flex
    column
    center
    className="drag-handle"
    css={{
      fontSize: '11px',
      lineHeight: '8px',
      letterSpacing: 0,
      width: 24,
      height: 16,
      cursor: 'grab',
      fontFamily: 'Hind',
      fontWeight: 500
    }}
    {...props}
  >
    <div>::</div>
    <div>::</div>
  </Flex>
)
