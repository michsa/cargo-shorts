import * as React from 'react'
import { Tab } from '../../types'

const TabInfo = (props: Tab) => (
  <div>
    <h1>url: {props.url ? props.url: '(none)'}</h1>
    <h2>name: {props.title ? props.title: '(none)'}</h2>
  </div>
)

export default TabInfo
