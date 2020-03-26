import React from 'react'

import styled from "../../styled"
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

const Container = styled.div`
  height: 0;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
`

const Base = styled.div<TriangleProps>`
  width: 0px;
  height: 0px;
  border-style: solid;
  position: absolute;
`

const Outer = styled(Base)<TriangleProps>`
  border-width: 0px ${props => props.width}px ${props => props.height}px;
  border-color: transparent transparent
    ${props => props.borderColor || 'rgba(0, 0, 0, 0.15)'};
  top: -${props => props.height}px;
  ${props => props.side}: ${props => props.margin}px;
`

const Inner = styled(Base)<TriangleProps>`
  border-width: 0px ${props => props.width - props.borderWidth}px
    ${props => props.height - props.borderWidth}px;
  border-color: transparent transparent
    ${props => props.bgColor || props.theme.backgroundColor};
  top: -${props => props.height - props.borderWidth}px;
  ${props => props.side}: ${props => props.margin + props.borderWidth}px;
  z-index: 10;
`

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
