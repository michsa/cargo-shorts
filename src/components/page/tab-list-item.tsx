import * as React from 'react'

import { SavedTab } from '../../types'
import { FlexCenter, FlexChild } from '../shared/flexbox'
import TabInfo from '../shared/tab-info'
import { DragHandle } from '../shared/utils'

interface Props {
  tab: SavedTab
}

export default ({ tab }: Props) => (
  <li className="tab-list-item" key={tab.id}>
    <FlexCenter>
      <FlexChild flex={0}>
        <DragHandle />
      </FlexChild>
      <FlexChild flex={1} style={{ minWidth: 0, textAlign: 'left' }}>
        <a href={tab.url} >
          <TabInfo tab={tab} iconSize={24} />
        </a>
      </FlexChild>
    </FlexCenter>
  </li>
)
