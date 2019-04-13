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
  .pocket-count {
    background-color: ${props =>
    Color(props.theme.altBackgroundColor).alpha(0.65).string()
  };
    box-shadow: 0 0 0 1px ${props =>
    Color(props.theme.altBackgroundColor).alpha(0.15).string()
  }, 0 0 3px ${props => Color(props.theme.altBackgroundColor).alpha(0.65).string()};
    color: ${props => props.theme.textColor}
  }
`
