import * as React from 'react'

import { SavedTab } from '../../types'
import TabInfo from '../shared/tab-info'

interface Props {
  tab: SavedTab
}

export default ({ tab }: Props) => (
  <li key={tab.id}>
    <TabInfo tab={tab} />
  </li>
)
