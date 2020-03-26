import Color from 'color'
import { Flex } from 'reflexbox'

import styled from '../../styled-components'

export default styled(Flex)<{ color: string }>`
  background-color: ${props => props.color};
  color: ${props =>
    Color(props.color).isDark() !== props.theme.isDark
      ? props.theme.altBackgroundColor
      : props.theme.textColor};
`
