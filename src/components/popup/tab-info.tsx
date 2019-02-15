import * as React from 'react'

import { Tab } from '../../types'
// import { connect } from 'react-redux'

// const mapStateToProps = (state: State) => (state.tabs.current as Tab)

interface Props {
  tab: Tab
}

const TabInfo = ({tab}: Props) => (
  <div>
    <p>url: {tab.url ? tab.url : '(none)'}</p>
    <p>name: {tab.title ? tab.title : '(none)'}</p>
  </div>
)

export default TabInfo

// export default connect(mapStateToProps)(TabInfo)
