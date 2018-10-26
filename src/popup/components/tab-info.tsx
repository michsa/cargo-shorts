import * as React from 'react'
import { Tab, State } from '../../types'
import { connect } from 'react-redux'

const mapStateToProps = (state: State) => (state.tabs.current as Tab)

const TabInfo = (props: Tab) => (
  <div>
    <p>url: {props.url ? props.url : '(none)'}</p>
    <p>name: {props.title ? props.title : '(none)'}</p>
  </div>
)

export default connect(mapStateToProps)(TabInfo)
