import React from 'react'

import styled from '../../styled'
import { Tab } from '../../types'
import Flex from '../shared/flex'
import { Truncated } from '../shared/utils'

interface Props {
  tab: Tab
  iconSize?: number
}

const Favicon = styled.div<{ src: string; iconSize: number }>(props => ({
  width: props.iconSize,
  height: props.iconSize,
  backgroundImage: `url(${props.src})`,
  backgroundSize: 'contain',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat'
}))

const TabInfo = ({ tab, iconSize = 32 }: Props) => (
  <Flex center className="tab-info" flex={1}>
    {tab.favicon && (
      <Flex flex={0}>
        <Favicon src={tab.favicon} iconSize={iconSize} />
      </Flex>
    )}
    <Flex column flex={1} css={{ minWidth: 0, textAlign: 'left' }}>
      <Truncated css={{ fontWeight: 600, fontSize: '1.1rem' }}>
        {tab.title}
      </Truncated>
      <Truncated>{tab.url}</Truncated>
    </Flex>
  </Flex>
)
export default TabInfo
