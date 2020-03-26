import Color from 'color'
import React from 'react'

import styled from "../../styled"
import Flex from '../shared/flex'

const PocketCountStyle = styled(Flex)<{ margin: number }>`
  background-color: ${props =>
    Color(props.theme.colors.altBackground)
      .alpha(0.65)
      .string()};
  box-shadow: 0 0 0 1px ${props =>
    Color(props.theme.colors.altBackground)
      .alpha(0.15)
      .string()}, 0 0 3px ${props =>
  Color(props.theme.colors.altBackground)
    .alpha(0.65)
    .string()};
  color: ${props => props.theme.colors.text}
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
