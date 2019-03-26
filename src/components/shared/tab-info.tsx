import React from 'react'

import styled from '../../styled-components'
import { Tab } from '../../types'
import { FlexChild, FlexParent } from '../shared/flexbox'
import { Truncated } from '../shared/utils'

interface Props { tab: Tab }

type FaviconProps = { src: string }

const Favicon = styled('div') <FaviconProps>`
  width: 32px;
  height: 32px;
  background-image: url(${props => props.src});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`

export default ({ tab }: Props) => (
  <FlexParent
    flexDirection="row"
    alignItems="center"
    justifyContent="center"
    className="tab-info"
  >
    {tab.favicon &&
      <FlexChild flex={0}>
        <Favicon src={tab.favicon} />
      </FlexChild>
    }
    <FlexChild
      flexDirection="column"
      flex={1}
      style={{ minWidth: 0, textAlign: 'left' }}
    >
      <Truncated style={{ fontWeight: 'bold', fontSize: '1.1em' }}>{tab.title}</Truncated>
      <Truncated>{tab.url}</Truncated>
    </FlexChild>
  </FlexParent>
)
