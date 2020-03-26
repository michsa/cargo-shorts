import Color from 'color'
import React from 'react'
import { Flex } from 'reflexbox'

import styled from "../../styled"

const PocketCountStyle = styled(Flex)<{ margin: number }>`
  background-color: ${props =>
    Color(props.theme.altBackgroundColor)
      .alpha(0.65)
      .string()};
  box-shadow: 0 0 0 1px ${props =>
    Color(props.theme.altBackgroundColor)
      .alpha(0.15)
      .string()}, 0 0 3px ${props =>
  Color(props.theme.altBackgroundColor)
    .alpha(0.65)
    .string()};
  color: ${props => props.theme.textColor}
  margin: 0 ${props => props.margin}px;
}
`

const PocketCount = ({ count, margin }: { count: number; margin?: number }) => (
  <PocketCountStyle
    className="pocket-count"
    flex={0}
    margin={margin !== undefined ? margin : 8}
  >
    {count}
  </PocketCountStyle>
)

export default PocketCount
