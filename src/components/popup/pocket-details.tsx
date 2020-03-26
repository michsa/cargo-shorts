import Color from 'color'
import { prop } from 'ramda'
import { Flex } from 'reflexbox'

import styled from "../../styled"

export default styled(Flex)<{ isActive: boolean; color: string }>`
  display: flex;
  flex: 1;
  align-items: center;
  background-color: ${props =>
    props.isActive ? props.color : props.theme.colors.altBackground};
  color: ${({ isActive, color, theme }) =>
    isActive && Color(color).isDark() !== theme.isDark
      ? theme.colors.altBackground
      : theme.colors.text};
  border-left: 8px solid ${prop('color')};
  :hover {
    background-color: ${({ isActive, color, theme }) =>
      Color(theme.colors.altBackground)
        .mix(Color(color), isActive ? 0.8 : 0.15)
        .hex()};
  }
  .pocket-count {
    background-color: ${props =>
      Color(props.theme.colors.altBackground)
        .alpha(0.65)
        .string()};
    box-shadow: 0 0 0 1px
        ${props =>
          Color(props.theme.colors.altBackground)
            .alpha(0.15)
            .string()},
      0 0 3px
        ${props =>
          Color(props.theme.colors.altBackground)
            .alpha(0.65)
            .string()};
    color: ${props => props.theme.colors.text};
  }
`
