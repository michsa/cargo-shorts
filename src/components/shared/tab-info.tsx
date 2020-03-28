/** @jsx jsx */
import { jsx } from '@emotion/core'

import { Tab } from '../../types'
import Flex from '../shared/flex'
import { Truncated } from '../shared/utils'

interface Props {
  tab: Tab
  iconSize?: number
}

const TabInfo = ({ tab, iconSize = 32 }: Props) => (
  <Flex
    center
    className="tab-info"
    flex={1}
    gap={8}
    css={{
      // needed for children to truncate, since this is the top-level flex
      overflow: 'hidden'
    }}
  >
    {tab.favicon && (
      <div
        css={{
          width: iconSize,
          height: iconSize,
          backgroundImage: `url(${tab.favicon})`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          flex: `0 0 ${iconSize}px`
        }}
      />
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
