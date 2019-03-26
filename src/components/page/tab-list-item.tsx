import * as React from 'react'

import { SavedTab } from '../../types'
import TabInfo from '../shared/tab-info'

interface Props {
  tab: SavedTab
}

export default ({ tab }: Props) => (
  <li className="tab-list-item" key={tab.id}>
    <TabInfo tab={tab} />
  </li>
)
