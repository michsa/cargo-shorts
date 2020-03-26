/** @jsx jsx */
import { jsx } from '@emotion/core'
import Flex from '../shared/flex'

const PopupHeader = (props: { children?: React.ReactNode }) => (
  <Flex
    center
    as="header"
    css={theme => ({
      borderBottom: `2px solid`,
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.secondary,
      padding: `12px 0`
    })}
    {...props}
  />
)
export default PopupHeader
