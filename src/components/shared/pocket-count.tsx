import Color from 'color'
import React from 'react'

import Flex from '../shared/flex'

const PocketCount = ({ count }: { count: number }) => (
  <Flex
    className="pocket-count"
    flex={0}
    css={theme => ({
      backgroundColor: Color(theme.colors.altBackground)
        .alpha(0.65)
        .string(),
      boxShadow: `0 0 0 1px ${Color(theme.colors.altBackground)
        .alpha(0.15)
        .string()}, 0 0 3px ${Color(theme.colors.altBackground)
        .alpha(0.65)
        .string()}`,
      color: theme.colors.text,
    })}
  >
    {count}
  </Flex>
)

export default PocketCount
