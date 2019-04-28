import Color from 'color'

import styled from '../../styled-components'
import { FlexParent } from '../shared/flexbox'

export default styled(FlexParent) <{ color: string }>`
  background-color: ${props => props.color};
  color: ${props =>
    Color(props.color).isDark() !== props.theme.isDark
      ? props.theme.altBackgroundColor
      : props.theme.textColor
  };
`
