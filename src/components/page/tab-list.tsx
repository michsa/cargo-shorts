import * as React from 'react'
import { connect } from 'react-redux'

import { makeGetOrderedTabs } from '../../redux/selectors'
import { PocketID, SavedTab, State } from '../../types'

import TabListItem from './tab-list-item'

interface OwnProps {
  pocketId: PocketID
}

interface StateProps {
  tabs: SavedTab[]
}

const makeMapStateToProps = () => {
  const getOrderedTabs = makeGetOrderedTabs()
  const mapStateToProps = (state: State, { pocketId }: OwnProps) => ({
    tabs: getOrderedTabs(state, pocketId)
  } as StateProps)
  return mapStateToProps
}

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

export default connect(makeMapStateToProps)(TabList)