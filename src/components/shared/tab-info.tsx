// import Flexbox from 'flexbox-react'
import React from 'react'

import styled from '../../styled-components'
import { Tab } from '../../types'

interface Props {
  tab: Tab
}

const OneLine = styled.div`
  overflow: hidden;
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const TabTitle = styled(OneLine)`
  font-weight: bold;
`

const TabInfo = ({ tab }: Props) => (
  <div>shit</div>
  /*
  <Flexbox flexDirection="column">
    <Flexbox element="figure" maxWidth="100px" flexGrow={0}>
      <img src={tab.favicon} />
    </Flexbox>
    <Flexbox flexDirection="row" flexGrow={1}>
      <TabTitle className="tab-title">{tab.title}</TabTitle>
      <OneLine className="tab-url">{tab.url}</OneLine>
    </Flexbox>
  </Flexbox>
  */
)

export default TabInfo
