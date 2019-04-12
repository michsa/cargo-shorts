import React from 'react'

import styled from '../../styled-components'
import { Tab } from '../../types'
import { FlexChild, FlexParent } from '../shared/flexbox'
import { Truncated } from '../shared/utils'

interface Props { 
  tab: Tab,
  iconSize?: number
}

const Favicon = styled('div') <{ src: string, iconSize: number }>`
  width: ${props => props.iconSize}px;
  height: ${props => props.iconSize}px;
  background-image: url(${props => props.src});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`

export default ({ tab, iconSize = 32 }: Props) => (
  <FlexParent
    flexDirection="row"
    alignItems="center"
    justifyContent="center"
    className="tab-info"
  >
    {tab.favicon &&
      <FlexChild flex={0}>
        <Favicon src={tab.favicon} iconSize={iconSize} />
      </FlexChild>
    }
    <FlexChild
      flexDirection="column"
      flex={1}
      style={{ minWidth: 0, textAlign: 'left' }}
    >
      <Truncated style={{ fontWeight: 600, fontSize: '1.1rem' }}>{tab.title}</Truncated>
      <Truncated>{tab.url}</Truncated>
    </FlexChild>
  </FlexParent>
)
