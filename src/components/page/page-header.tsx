import * as React from 'react'
import { Flex } from 'reflexbox'

import styled from '../../styled-components'
import { IconButton } from '../shared/button'

import PocketIcons from './pocket-summary'

const PageHeaderButton = styled(IconButton)`
  background-color: transparent;
  color: ${props => props.theme.textColor};
`

const PageHeader = () => (
  <Flex className="page-header" alignItems="center" flex="0 0 48px">
    <Flex flex="0 0 160px" className="title">
      <div className="shorts" />
      Cargo Shorts
    </Flex>
    <Flex flex={1} className="icons">
      <PocketIcons />
    </Flex>
    <Flex flex="0 0 160px" justifyContent="flex-end" className="buttons">
      <PageHeaderButton onClick={() => null} icon="⚙️">
        Options
      </PageHeaderButton>
    </Flex>
  </Flex>
)
export default PageHeader
