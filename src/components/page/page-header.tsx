/** @jsx jsx */
import { jsx } from '@emotion/core'

import { IconButton } from '../shared/button'
import Flex from '../shared/flex'

import PocketIcons from './pocket-summary'

const PageHeader = () => (
  <Flex
    id="page-header"
    alignItems="center"
    justifyContent="space-between"
    css={theme => ({
      backgroundColor: theme.colors.secondary,
      borderBottom: `2px solid ${theme.colors.primary}`,
      padding: 16
    })}
  >
    <Flex
      alignItems="center"
      css={theme => ({
        fontSize: '1.5em',
        fontWeight: 600,
        color: theme.colors.text
      })}
    >
      <div
        className="shorts"
        css={{
          display: 'inline-block',
          height: 22,
          width: 22,
          verticalAlign: 'sub',
          marginRight: 8,
          backgroundImage: 'url(icons/blue_lined.svg)'
        }}
      />
      Cargo Shorts
    </Flex>
    <PocketIcons />
    <IconButton
      onClick={() => null}
      icon="⚙️"
      css={theme => ({ color: theme.colors.text, borderStyle: 'solid' })}
    >
      Options
    </IconButton>
  </Flex>
)
export default PageHeader
