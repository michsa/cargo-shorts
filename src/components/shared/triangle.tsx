import React from 'react'

import styled from '../../styled-components'
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
  width: 100%;
  height: 0;
  position: relative;
`

const Base = styled.div<TriangleProps>`
  width: 0px;
  height: 0px;
  border-style: solid;
  position: absolute;
  left: ${props => props.side === 'left' ? `${props.width + 2}px` : 'auto'};
  right: ${props => props.side === 'right' ? `-${props.width + 2}px` : 'auto'};
`

const Outer = styled(Base) <TriangleProps>`
  border-width: 0px ${props => props.width}px ${props => props.height}px;
  border-color: transparent transparent ${props => props.borderColor || 'rgba(0, 0, 0, 0.1)'};
  top: -${props => props.height + props.borderWidth}px;
  ${props => props.side}: ${props => props.margin}px;
`

const Inner = styled(Base) <TriangleProps>`
  border-width: 0px ${props => props.width - props.borderWidth}px ${props => props.height - props.borderWidth}px;
  border-color: transparent transparent ${props => props.bgColor || props.theme.backgroundColor};
  top: -${props => props.height}px;
  ${props => props.side}: ${props => props.margin + props.borderWidth}px;
`

const defaults = {
  width: 10,
  height: 10,
  side: 'left',
  borderWidth: 1,
  margin: 10
} as Omit<TriangleProps, 'bgColor' | 'borderColor'>

export const Triangle = (props: Partial<TriangleProps>) => (
  <Container>
    <Outer
      width={props.width || defaults.width}
      height={props.height || defaults.height}
      bgColor={props.bgColor}
      side={props.side || defaults.side}
      borderWidth={props.borderWidth || defaults.borderWidth}
      margin={props.margin || defaults.margin}
    />
    {Inner({ ...defaults, ...props } as TriangleProps)}
  </Container>
)
