import Color from 'color'
import { Flex } from 'reflexbox'

import styled from "../../styled"

export default styled(Flex)<{ color: string }>`
  background-color: ${props => props.color};
  color: ${props =>
    Color(props.color).isDark() !== props.theme.isDark
      ? props.theme.colors.altBackground
      : props.theme.colors.text};
`
