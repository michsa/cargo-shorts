/** @jsx jsx */
import { jsx } from '@emotion/core'

import Flex, { FlexProps } from '../shared/flex'

import { Emoji } from './emoji'

interface Props {
  icon?: string
  children?: React.ReactChild
  onClick: () => void
}

export const Button = ({ icon, children, ...props }: Props & FlexProps) => (
  <Flex
    as="button"
    center
    gap="0.4em"
    className="button"
    css={theme => ({
      backgroundColor: theme.colors.altBackground,
      borderColor: theme.colors.primary,
      borderRadius: 4,
      borderStyle: 'dashed',
      borderWidth: 2,
      color: theme.colors.primary,
      cursor: 'pointer',
      fontFamily: 'Nunito, sans-serif',
      fontSize: '1.1em',
      fontWeight: 700,
      height: 32,
      letterSpacing: 0,
      outline: 'none',
      padding: '4px 16px',
      textAlign: 'center',
      transition: '0.1s',
      ':hover': {
        backgroundColor: theme.colors.accent,
        borderStyle: 'solid',
        boxShadow: `0px 1px 2px rgba(0, 0, 0, 0.2)`
      },
      ':active': {
        backgroundColor: theme.colors.secondary,
        boxShadow: 'none'
      }
    })}
    {...props}
  >
    {icon && <Emoji emoji={icon} size={14} />}
    {children && <span>{children}</span>}
  </Flex>
)

export const IconButton = Button
