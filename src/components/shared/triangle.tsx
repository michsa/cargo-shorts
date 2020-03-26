import React from 'react'

import styled from '../../styled'
import { Omit } from '../../types'

interface TriangleProps {
  bgColor?: string
  width: number
  height: number
  borderColor?: string
  margin: number
  borderWidth: number
  side: 'left' | 'right'
}

const Container = styled.div({
  height: 0,
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0
})

const Base = styled.div<TriangleProps>({
  width: 0,
  height: 0,
  borderStyle: 'solid',
  position: 'absolute'
})

const Outer = styled(Base)<TriangleProps>(props => ({
  borderWidth: `0px ${props.width}px ${props.height}px`,
  borderColor: `transparent transparent
    ${props.borderColor || 'rgba(0, 0, 0, 0.15)'}`,
  top: -props.height,
  [props.side]: props.margin
}))

const Inner = styled(Base)<TriangleProps>(props => ({
  borderWidth: `0px ${props.width - props.borderWidth}px
    ${props.height - props.borderWidth}px`,
  borderColor: `transparent transparent
    ${props.bgColor || props.theme.colors.background}`,
  top: -(props.height - props.borderWidth),
  [props.side]: props.margin + props.borderWidth,
  zIndex: 10
}))

const defaults = {
  width: 10,
  height: 10,
  side: 'left',
  borderWidth: 1,
  margin: 10
} as Omit<TriangleProps, 'bgColor' | 'borderColor'>

export const Triangle: React.FunctionComponent<Partial<
  TriangleProps
>> = props => (
  <Container>
    <Outer {...{ ...defaults, ...props }} />
    <Inner {...{ ...defaults, ...props }} />
  </Container>
)
