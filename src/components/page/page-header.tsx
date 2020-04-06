/** @jsx jsx */
import { jsx } from '@emotion/core'

import { IconButton } from '../shared/button'
import Flex from '../shared/flex'
import Grid from '../shared/grid'

import PocketIcons from './pocket-summary'

const hideText = (width: number) => ({ [`@media (max-width: ${width}px)`]: { display: 'none' } })

const PageHeader = () => (
  <Grid
    columns="auto 1fr auto"
    gap={16}
    id="page-header"
    placeItems="center"
    css={theme => ({
      backgroundColor: theme.colors.secondary,
      borderBottom: `2px solid ${theme.colors.primary}`,
      minHeight: 40,
      padding: '8px 16px'
    })}
  >
    <Flex
      alignItems="center"
      css={{ fontSize: '1.5em', fontWeight: 600, whiteSpace: 'nowrap' }}
      gap={8}
    >
      <img
        className="shorts"
        src="icons/blue_lined.svg"
        css={{
          height: 22,
          width: 22,
          verticalAlign: 'sub'
        }}
      />
      <span css={hideText(800)}>Cargo Shorts</span>
    </Flex>
    <PocketIcons />
    <IconButton
      onClick={() => null}
      icon="⚙️"
      css={theme => ({ color: theme.colors.text, '.text': hideText(800) })}
    >
      Options
    </IconButton>
  </Grid>
)
export default PageHeader
