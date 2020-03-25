import * as React from 'react'

import styled from '../../styled-components'
import { IconButton } from '../shared/button'
import { FlexChild, FlexParent } from '../shared/flexbox'

import PocketIcons from './pocket-summary'

const PageHeaderButton = styled(IconButton)`
  background-color: transparent;
  color: ${props => props.theme.textColor};
`

const PageHeader = () => (
      <FlexParent
        className="page-header"
        alignItems="center"
        flex="0 0 48px"
      >
        <FlexChild flex="0 0 160px" className="title">
          <div className="shorts" />
          Cargo Shorts
        </FlexChild>
        <FlexChild flex={1} className="icons">
          <PocketIcons />
        </FlexChild>
        <FlexParent flex="0 0 160px" justifyContent="flex-end" className="buttons">
          <PageHeaderButton onClick={() => null} icon="⚙️">Options</PageHeaderButton>
        </FlexParent>
      </FlexParent>
)
export default PageHeader
