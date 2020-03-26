import * as React from 'react'

import styled from '../../styled'
import { IconButton } from '../shared/button'
import Flex from '../shared/flex'

import PocketIcons from './pocket-summary'

const PageHeaderButton = styled(IconButton)(props => ({
  backgroundColor: 'transparent',
  color: props.theme.colors.text
}))

const PageHeader = () => (
  <Flex id="page-header" alignItems="center" flex="0 0 48px">
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
