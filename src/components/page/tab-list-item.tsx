/** @jsx jsx */
import { jsx } from '@emotion/core'

import { SavedTab } from '../../types'
import Flex from '../shared/flex'
import TabInfo from '../shared/tab-info'
import { DragHandle } from '../shared/utils'

interface Props {
  tab: SavedTab
  index: number
}

const TabListItem = ({ tab, index }: Props) => (
  <div
    className="tab-list-item"
    css={theme => ({
      backgroundColor: theme.colors.background,
      padding: '4px 0',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.15)',
      '& + &': { marginTop: 4 }
    })}
  >
    <Flex justifyContent="center" alignItems="center">
      <DragHandle />
      <Flex flex={1} css={{ minWidth: 0, textAlign: 'left' }}>
        <a
          href={tab.url}
          css={{
            textDecoration: 'none',
            color: 'inherit',
            overflow: 'hidden'
          }}
        >
          <TabInfo
            tab={tab}
            iconSize={24}
            css={{
              fontSize: '0.9em',
              marginLeft: 0,
              marginRight: 4
            }}
          />
        </a>
      </Flex>
    </Flex>
  </div>
)
export default TabListItem
