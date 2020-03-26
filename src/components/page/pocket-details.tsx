import Color from 'color'

import styled from "../../styled"
import Flex from '../shared/flex'

export default styled(Flex)<{ color: string }>`
  background-color: ${props => props.color};
  color: ${props =>
    Color(props.color).isDark() !== props.theme.isDark
      ? props.theme.colors.altBackground
      : props.theme.colors.text};
`
