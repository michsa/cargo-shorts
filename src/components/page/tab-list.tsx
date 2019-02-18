import * as React from 'react'
import { connect } from 'react-redux'

import { getOrderedTabs } from '../../redux/selectors'
import { Pocket, SavedTab, State } from '../../types'

import TabListItem from './tab-list-item'

interface OwnProps {
  pocket: Pocket
}

interface StateProps {
  tabs: SavedTab[]
}

const mapStateToProps = (state: State, { pocket }: OwnProps) => ({
  tabs: getOrderedTabs(state, pocket)
} as StateProps)

const TabList = ({ tabs }: StateProps) => (
  <ul id="pocket-list">
    {tabs.map((tab) =>
      <TabListItem
        tab={tab}
        key={tab.id}
      />
    )}
  </ul>
)

export default connect(mapStateToProps)(TabList)
