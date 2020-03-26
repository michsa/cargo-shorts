/** @jsx jsx */
import { jsx } from '@emotion/core'

import Flex from '../shared/flex'

import { Emoji } from './emoji'

interface Props {
  icon?: string
  children?: React.ReactChild
  onClick: () => void
}

export const IconButton = ({ icon, children, onClick }: Props) => (
  <Flex
    as="button"
    center
    gap="0.4em"
    className="button"
    onClick={onClick}
    css={theme => ({
      borderColor: theme.colors.primary,
      color: theme.colors.primary,
      backgroundColor: theme.colors.altBackground,
      ':hover': { backgroundColor: theme.colors.accent },
      ':active': { backgroundColor: theme.colors.secondary }
    })}
  >
    {icon && <Emoji emoji={icon} size={14} />}
    <span>{children}</span>
  </Flex>
)

export const Button = IconButton
