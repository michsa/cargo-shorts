import Color from 'color'
import React from 'react'

import styled from '../../styled-components'

import { FlexChild } from './flexbox'

const PocketCountStyle = styled(FlexChild)`
  background-color: ${props =>
    Color(props.theme.altBackgroundColor).alpha(0.65).string()
  };
  box-shadow: 0 0 0 1px ${props =>
    Color(props.theme.altBackgroundColor).alpha(0.15).string()
  }, 0 0 3px ${props => Color(props.theme.altBackgroundColor).alpha(0.65).string()};
  color: ${props => props.theme.textColor}
}
`

const PocketCount: React.FunctionComponent<{count: number}> = ({count}) => (
  <PocketCountStyle className="pocket-count" flex={0}>
    {count}
  </PocketCountStyle>
)

export default PocketCount
