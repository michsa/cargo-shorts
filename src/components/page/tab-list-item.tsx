import * as React from 'react'

import { SavedTab } from '../../types'

interface Props {
  tab: SavedTab
}

export default ({ tab }: Props) => (
  <li className="tab-list-item" key={tab.id}>
    <div
      className="tab-list-item-details"
    >
      <span className="tab-title">{tab.title} </span>
      <span className="tab-url"> {tab.url} </span>
    </div>
  </li>
)
