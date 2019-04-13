import Color from 'color'

import styled from '../../styled-components'
import { FlexParent } from '../shared/flexbox'

export default styled(FlexParent) <{ isActive: boolean, color: string }>`
  background-color: ${props =>
    props.isActive
      ? props.color
      : props.theme.altBackgroundColor
  };
  color: ${props =>
    props.isActive && Color(props.color).isDark() !== props.theme.isDark
      ? props.theme.altBackgroundColor
      : props.theme.textColor
  };
  border-left: 8px solid ${props => props.color};
  :hover {
    background-color: ${props =>
    Color(props.theme.altBackgroundColor).mix(
      Color(props.color), props.isActive ? 0.8 : 0.1
    ).hex()
  };
  }
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
