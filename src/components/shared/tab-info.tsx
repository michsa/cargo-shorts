import * as React from 'react'

import { Tab } from '../../types'

interface Props {
  tab: Tab
}

const TabInfo = ({tab}: Props) => (
  <div>
    <div className="tab-title">{tab.title}</div>
    <div className="tab-url">{tab.url}</div>
  </div>
)

export default TabInfo
